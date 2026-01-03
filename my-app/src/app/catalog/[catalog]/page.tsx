import FilterMenu from "@/components/features/filterMenu/FilterMenu";
import { prisma } from '@/lib/prisma'
import MenuBlock from "@/components/ui/menuBlock";
import { headers } from "next/headers";
import { createApi } from "@/lib/createApi";

const Page = async ({params, searchParams}: {
  
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {
  
    const SearchParams = await searchParams;
    const paramsUrl =  await params

      console.log(createApi(paramsUrl,SearchParams))
    const products = await prisma.product.findMany({
  where: {
    categorySlug: 'laptops',                  // ноутбуки
    brand: {
      name: 'AMD'                            // бренд ASUS
    },
    laptopSpec: {                               // ← здесь магия
                                   // ровно 16 ГБ
      // ramGb: { gte: 16 }                   // 16 и больше
      // ramGb: { in: [16, 32] }              // 16 или 32
    },
    available: true
  },
  include: {
    brand: true,
    category: true,
    laptopSpec: true                        // чтобы вернуть характеристики в ответе
  },
  orderBy: {
    price: 'asc'
  },
  take: 24
})

    // console.log(products)
    return ( 
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_10fr] gap-6 lg:gap-10  w-[90vw]">
        <aside className="">
            <FilterMenu/>
        </aside>
        <main>
            <MenuBlock/>
        </main>
    </section> 
    );
}
 
export default Page;