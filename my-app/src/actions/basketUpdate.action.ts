"use server"

import { auth } from "@/auth"
import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"

export const basketUpdateAction = async (formData:FormData ) => {
    try {
        const session = await auth()
        const userId = session?.user?.id

        const ItemId = formData.get('ItemId') as string
        const action = formData.get("action")
        const basketItem = await prisma.basketItem.findFirst({
            where: {
                id: ItemId,
                basket: {
                    userId: userId
                }
            },
            select: {
                id: true,
                quantity: true,
                basketId: true
            }
        })
        if (basketItem) {
            const newQuantity = action === "+"
        ? basketItem.quantity + 1
        : Math.max(0,basketItem.quantity-1)

        if (newQuantity === 0) {
            await prisma.basketItem.delete({
                where: {id: ItemId}
            })
        } else {
            await prisma.basketItem.update({
                where: {id: ItemId},
                data: {quantity: newQuantity}
            })
        }
        revalidatePath("/basket")
        }
        
    } catch (error) {
        console.log(error)
       
    }
}