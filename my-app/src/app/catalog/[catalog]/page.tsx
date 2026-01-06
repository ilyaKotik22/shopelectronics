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

      
    const products = await prisma.product.findMany(createApi(paramsUrl,SearchParams))

    console.log(createApi(paramsUrl,SearchParams))
    return ( 
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_10fr] gap-6 lg:gap-10  w-[90vw]">
        <aside className="">
            <FilterMenu/>
        </aside>
        <main>
            <MenuBlock items={products}/>
        </main>
    </section> 
    );
}
 
export default Page;