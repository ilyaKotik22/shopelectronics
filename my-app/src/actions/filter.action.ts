// lib/createApi.ts
import type { Prisma } from '@prisma/client'

type QueryParams = Record<string, string | string[] | undefined>

const whereBuilder = (param: string | string[]) => {
 
  if (Array.isArray(param)){
          const finnalValue = param.map((el) => el.split('.')[1])
          return finnalValue
          
        }else{
          const finnalValue = param.split('.')
        
         return [finnalValue[1]]
        }}

export const filterAction = (params: { catalog: string }, query: QueryParams) => {
  const categorySlug = params.catalog || ""

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
  
    if (!prefix || !filterValue) return
   
    // 1. Обработка defaultFilter → обычные поля Product
    if (prefix === 'defaultFilter') {
      if (key === 'brand') {
        where.brand = {
          name: { in: whereBuilder(value) }
        }
      }
  
      where.price = {gte: 0, lte: 10000000}
      if (key === 'min'){
        where.price.gte = Number(filterValue)
      }
      if (key === 'max'){
        where.price.lte = Number(filterValue)
      }
    }
    // 2. Обработка спецификаций (laptopSpec, smartphoneSpec и т.д.)
    else if (prefix.endsWith('Spec')) {
      const specName: keyof Prisma.ProductWhereInput = prefix // laptopSpec, smartphoneSpec и т.д.

      // Добавляем include, если его ещё нет
      if (!include[specName as keyof Prisma.ProductInclude]) {
        include[specName as keyof Prisma.ProductInclude] = true
      }

      // Формируем условие для этой спецификации
      if (!where[specName]) {
        where[specName] = {}
      }

       if (key === 'ram' || key === 'ramGb' || key === 'storage' || key === 'storageGb' || key === 'refreshHz' || key === 'cameraMp' || key === 'screenInch' || key === 'screen_size' || key === 'batteryMah' ) {
        const finnalValue = whereBuilder(value).map(v => Number(v.replace(/[^0-9]/g, '')))
        where[specName][key] = { in: finnalValue }
       }else{
        const finnalValue = whereBuilder(value)
        where[specName][key] = { in: finnalValue }
       }
    }
  })

  return {
    where,
    include,
    orderBy: { price: 'asc' as const},
    take: 24,
  }
}