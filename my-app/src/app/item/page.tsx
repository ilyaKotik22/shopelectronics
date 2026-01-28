import ItemPage from "@/components/shared/ItemPage";
import { itemPageAction } from "@/actions/itemPage.action";
import { prisma } from "@/lib/prisma";
import { BaseItem } from "@/types/item";
import { safeFetch } from "@/lib/utils";

const Page =  async ({ searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    }) => {
        const params = await searchParams
        const id = String(params.id || '');
        const categorySlug = String(params.categorySlug || '');
        let product: BaseItem[] = []
        product = await safeFetch(prisma.product,itemPageAction({id,categorySlug}))
    
    return ( 
    <main>
        {product.length ? <ItemPage 
        item={product[0]}/> : <section>При поиске товара произошла ошибка</section>}
        
    </main>
 );
}
 
export default Page;