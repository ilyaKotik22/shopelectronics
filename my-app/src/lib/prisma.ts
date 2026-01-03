// lib/prisma.ts
import { PrismaClient } from '@prisma/client'  // ← или "@/generated/prisma/client" — как у тебя раньше
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL не установлен в .env')
}

const adapter = new PrismaPg({
  connectionString,
  // можно добавить, если нужно ограничить пул:
  // pgOptions: { max: 15, connectionTimeoutMillis: 5000 }
})

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ adapter })
} else {
  // в dev-режиме используем глобальную переменную, чтобы не плодить подключения
  const globalForPrisma = global as unknown as { prisma?: PrismaClient }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }

  prisma = globalForPrisma.prisma
}

export { prisma }