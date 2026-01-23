"use server"
import { auth } from '@/auth';
import { prisma } from '../lib/prisma';

export const basketAddAction = async (formData: FormData, quantity:number = 1) => {
    const session = await auth()
    
    const productId: string = formData.get('productId')?.toString() ?? ''
  
    const userId = session?.user?.id
    try {
        const product = await prisma.product.findUnique({
            where: {id: productId},
            select: {
                id: true,
                price:true,
                currency:true,
                available:true,
                title: true
            }
        })
       
        if (quantity < 1) {
            quantity = 1
        }
        const existingItem = await prisma.basketItem.findFirst({
            where: {
                basket: {userId},
                productId
            }
        })
        if (product){
            await prisma.$transaction(async (tx) => {
            const basket = await tx.basket.findUnique({
                where: {userId}
            })
            if (existingItem) {
                await tx.basketItem.update({
                    where: {id: existingItem.id},
                    data: {
                        quantity: {increment:quantity},
                        priceAtAdd: product.price
                    }
                })
            }else {
                if(basket){
                    await tx.basketItem.create({
                    data: {
                        basketId: basket.id,
                        productId,
                        quantity,
                        priceAtAdd: product.price
                    }
                })
                }
                
            }
        })
        console.log("успешное добавление")
        }
        
        
    }catch (error) {
        console.log(error)
        
    }

};