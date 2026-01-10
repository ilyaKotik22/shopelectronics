// app/actions/search.ts
'use server'

import { prisma } from '@/lib/prisma'

const createSlice = (str:string) => {
    const result = []
    for (let i = 0; i <= str.length-3; i++){
        result.push(str.slice(i, i+3))
    }
    return result
}
export async function createApiSearch(formData: FormData) {
  const q = formData.get('q')?.toString()?.trim() ?? ''

  if (!q || q.length < 2) return []

  return prisma.product.findMany({
    where: {
      OR: createSlice(q).map(el => {
        return { title: { contains: el, mode: 'insensitive' } }
      })
    },
    take: 10,
    include: { brand: true },
    orderBy: { price: 'asc' }
  })
}