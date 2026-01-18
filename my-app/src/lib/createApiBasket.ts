"use server"
import { auth } from '@/auth';
import { Prisma } from '@prisma/client'; // или "@/generated/prisma/browser"

import { prisma } from './prisma';


type PageItemApiResult = {
  where: Prisma.ProductWhereInput;
  include: Prisma.ProductInclude;
  orderBy: Prisma.ProductOrderByWithRelationInput;
  take: number;
};

export const createApiBasket = async (formData: FormData, quantity:number = 1) => {
    const session = await auth()
    
    const productId = formData.get('productId')
    if(!session?.user?.id) {
        return {error: "необходимо войти в аккаунт"}
    }
    const userId = session.user.id
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
        if (!product) {
            return {error: "Товар не найден"}
        } 
        if (!product.available){
            return {error: "товар не доступен"}
        }
        if (quantity < 1) {
            quantity = 1
        }
        const existingItem = await prisma.basketItem.findFirst({
            where: {
                basket: {userId},
                productId
            }
        })
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
                await tx.basketItem.create({
                    data: {
                        basketId: basket.id,
                        productId,
                        quantity,
                        priceAtAdd: product.price
                    }
                })
            }
        })
        console.log("успешное добавление")
        return {
            success: true,
            message: `Добавленно ${quantity} шт ${product.title} в корзину`
        }
    }catch (error) {
        console.log(error)
        return error
    }

};