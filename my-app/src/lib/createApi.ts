// lib/createApi.ts
import type { Prisma } from '@prisma/client'

type QueryParams = Record<string, string | string[] | undefined>

export const createApi = (params: { catalog: string }, query: QueryParams) => {
  const categorySlug = params.catalog

  const where: Prisma.ProductWhereInput = {
    categorySlug,
    available: true,
  }

  const include: Prisma.ProductInclude = {
    brand: true,
    category: true,
  }

  Object.entries(query).forEach(([key, value]) => {
    if (!value) return

    const [prefix, filterValue] = String(value).split('.')
    console.log('sssssssss')
    if (!prefix || !filterValue) return

    // 1. Обработка defaultFilter → обычные поля Product
    if (prefix === 'defaultFilter') {
      if (key === 'brand') {
        where.brand = {
          name: { in: filterValue.split(',') }
        }
      }
      // можно добавить price, rating и т.д.
    }

    // 2. Обработка спецификаций (laptopSpec, smartphoneSpec и т.д.)
    else if (prefix.endsWith('Spec')) {
      const specName = prefix // laptopSpec, smartphoneSpec и т.д.

      // Добавляем include, если его ещё нет
      if (!include[specName as keyof Prisma.ProductInclude]) {
        include[specName as keyof Prisma.ProductInclude] = true
      }

      // Формируем условие для этой спецификации
      if (!where[specName]) {
        where[specName] = {}
      }

      const fieldName = key // ram, storage, screenInch и т.д.

      // Приводим значение к нужному типу
      let processedValue: any = filterValue

      // Примеры обработки значений
      if (fieldName === 'ram' || fieldName === 'ramGb' || fieldName === 'storage' || fieldName === 'storageGb') {
        // "8+ГБ" → 8
        processedValue = Number(filterValue.replace(/[^0-9]/g, ''))
      }
      else if (fieldName === 'year' || fieldName === 'refreshHz') {
        processedValue = Number(filterValue)
      }

      // Поддержка нескольких значений через запятую
      if (typeof filterValue === 'string' && filterValue.includes(',')) {
        const values = filterValue.split(',').map(v => Number(v.replace(/[^0-9]/g, '')))
        where[specName][fieldName] = { in: values }
      }
      else {
        where[specName][fieldName] = processedValue
      }
    }
  })

  return {
    where,
    include,
    orderBy: { price: 'asc' },
    take: 24,
  }
}