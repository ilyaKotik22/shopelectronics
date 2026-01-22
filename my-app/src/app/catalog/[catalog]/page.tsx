import FilterMenu from "@/features/filterMenu/FilterMenu";
import { prisma } from '@/lib/prisma'
import MenuBlock from "@/components/ui/menuBlock";
import { filterAction } from "@/actions/filter.action";
import { BaseItem } from "@/types/item";

const Page = async ({params, searchParams}: {
    params:{catalog: string},
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {
  
    const SearchParams = await searchParams;
    const paramsUrl =  await params

      
    const products: BaseItem[] = await prisma.product.findMany(filterAction(paramsUrl,SearchParams)) as unknown as BaseItem[] || []

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