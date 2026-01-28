import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const safeFetch = async <T>(  model: { findMany: (args?:any) => Promise<T> },
  args?: Parameters<typeof model.findMany>[0]) => {
  try{
    console.log()
    return model.findMany(args)

  }catch(error){
    console.error(error)
    return []
  }
  
}