"use server"

import { FormState } from "@/features/auth/Auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  login: z.string()
    .min(3, 'минимум 3 символа')
    .max(30, "слишком длинный")
    .regex(/^[a-zA-Z0-9_-]+$/, "только буквы, цифры, _ и -"),
  
  password: z.string()
    .min(8, 'минимум 8 символов')
    .max(100, 'пароль длинный')
})



export const authAction = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const data = {
    login: formData.get('login')?.toString()?.trim() ?? '',
    password: formData.get('password')?.toString()?.trim() ?? ''
  }

  // 1. Валидация Zod
  const result = registerSchema.safeParse(data)
  if (!result.success) {
    return {
      errors: {general: [result.error.flatten().fieldErrors as string]} ,
      message: 'Проверьте правильность заполнения'
    }
  }

  try {
    
    const existing = await prisma.user.findUnique({
      where: { login: data.login }
    })
    if (existing) {
      return {
        errors: { general: ["логин занят"] },
      }
    }

    
    const hashed = await bcrypt.hash(data.password, 10)

  
    await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          login: data.login,
          password: hashed,
        
        }
      })

      
      await tx.basket.create({
        data: {
          userId: newUser.id
      
        }
      })
    })

  
    return {
      ok: true,
      message: "Регистрация прошла успешно! Теперь можно войти."
    }

  } catch (error) {
    console.error("Ошибка регистрации:", error)
    return {
      errors: { general: ["Что-то пошло не так, попробуйте позже"]},
    }
  }
}

export async function loginAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState>{
  const data = Object.fromEntries(formData)
    
  const parsed = registerSchema.safeParse(data)
  if (!parsed.success) {
    return {
      errors:  { general: ["Проверьте введённые данные"] },
    }
  }

  // Проверяем существование пользователя и пароль
  const user = await prisma.user.findUnique({
    where: { login: parsed.data.login }
  })

  if (!user || !user.password) {
    return { errors: { general: ["Пользователь не найден"] } }
  }

  const passwordValid = await bcrypt.compare(parsed.data.password, user.password)
  if (!passwordValid) {
    return { errors: { general: ["Неверный пароль"] } }
  }

  // Если всё ок — говорим клиенту, что можно выполнять вход
  return {
    login: data.login as string,
    password: data.password as string,
    success: true,
    message: "Данные верны, сейчас выполним вход..."
  }
}