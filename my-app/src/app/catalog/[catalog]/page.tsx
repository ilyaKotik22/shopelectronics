import FilterMenu from "@/features/filterMenu/FilterMenu";
import { prisma } from '@/lib/prisma'
import MenuBlock from "@/components/shared/menuBlock";
import { filterAction } from "@/actions/filter.action";
import { BaseItem } from "@/types/item";
import { safeFetch } from "@/lib/utils";

const Page = async ({params, searchParams}: {
    params:{catalog: string},
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {
  
    const SearchParams = await searchParams;
    const paramsUrl =  await params

    console.log(SearchParams)
    console.log(paramsUrl)
    let products: BaseItem[] = []
    try{
        products = await safeFetch<BaseItem[]>(prisma.product,filterAction(paramsUrl,SearchParams)) 
    }catch(error){
        console.error("Ошибка при получении продуктов:", error)
    }
    return ( 
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_10fr] gap-6 lg:gap-10  w-[90vw]">
        <aside className="">
            <FilterMenu/>
        </aside>
        <main>
            {products.length ? <MenuBlock items={products}/> : <section className="text-center text-white dark:text-black">товары отсутствуют</section>}
            
        </main>
    </section> 
    );
}
 
export default Page;