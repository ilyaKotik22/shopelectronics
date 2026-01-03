import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {


  // Простейший insert, чтобы проверить работу
  await prisma.brand.upsert({
    where: { name: "TestBrand" },
    update: {},
    create: { name: "TestBrand" },
  })

  const brands = await prisma.brand.findMany()

}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
