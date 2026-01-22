"use server"

import { prisma } from "../lib/prisma"

export const basketGetAction = async (userId:string) => {
    const carts = await prisma.basket.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              laptopSpec: true,
              smartphoneSpec: true,
              tvSpec: true,
            }
          }
        },
        orderBy: { createdAt: "desc" },
      },
    },
  })
  return carts
}