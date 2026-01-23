import { CardProductType } from "@/types/cardProduct";
import Link from "next/link";


const CardProduct:React.FC<CardProductType> = ({id,name,price,categorySlug}) => {

    return ( 
    <Link href={{
        pathname: '../item',
        query: {id: id, categorySlug}
    }}>
        <article className="bg-neutral-900 dark:bg-neutral-200 dark:text-black px-6 py-4  max-w-[400px] min-w-[300px] text-white rounded-md hover:bg-neutral-800 duration-150">
            <div className="w-full h-[200px] bg-neutral-600 dark:bg-neutral-300"></div>
            <div className="mt-1">{name}</div>
         
            <div className="">{price + " "}рублей</div>
        </article> 
    </Link>
    
    );
}
 
export default CardProduct;