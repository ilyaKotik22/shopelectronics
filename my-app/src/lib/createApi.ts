// lib/createApi.ts
import type { Prisma } from '@prisma/client'

type QueryParams = Record<string, string | string[] | undefined>

const whereBuilder = (param) => {
  if (Array.isArray(param)){
          const finnalValue = param.map((el) => el.split('.')[1])
          console.log(finnalValue)
          return finnalValue
          
        }else{
          const finnalValue = param.split('.')
          console.log(finnalValue[1])
         return [finnalValue[1]]
        }
        }

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
  console.log(query)
  Object.entries(query).forEach(([key, value]) => {
    if (!value) return

    const [prefix, filterValue] = String(value).split('.')
  
    if (!prefix || !filterValue) return
   
    // 1. Обработка defaultFilter → обычные поля Product
    if (prefix === 'defaultFilter') {
      console.log('sadasdasd')
      if (key === 'brand') {
        where.brand = {
          name: { in: whereBuilder(value) }
        }
      }
      console.log(key)
      where.price = {gte: 0, lte: 10000000}
      if (key === 'min'){
        where.price.gte = Number(filterValue)
        
      }
      if (key === 'max'){
        where.price.lte = Number(filterValue)
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

       if (fieldName === 'ram' || fieldName === 'ramGb' || fieldName === 'storage' || fieldName === 'storageGb' || fieldName === 'refreshHz' || fieldName === 'cameraMp' || fieldName === 'screenInch') {
        const finnalValue = whereBuilder(value).map(v => Number(v.replace(/[^0-9]/g, '')))
        where[specName][fieldName] = { in: finnalValue }
       }else{
        const finnalValue = whereBuilder(value)
        where[specName][fieldName] = { in: finnalValue }
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