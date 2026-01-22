import ItemPage from "@/components/ui/ItemPage";
import { itemPageAction } from "@/actions/itemPage.action";
import { prisma } from "@/lib/prisma";
import { BaseItem } from "@/types/item";

const Page =  async ({ searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {
        const params = await searchParams
        const id = String(params.id || '');
        const categorySlug = String(params.categorySlug || '');
        const product: BaseItem[] = await prisma.product.findMany(itemPageAction({id,categorySlug})) || []
    
    return ( 
    <main>
        <ItemPage 
        item={product[0]}/>
    </main>
 );
}
 
export default Page;