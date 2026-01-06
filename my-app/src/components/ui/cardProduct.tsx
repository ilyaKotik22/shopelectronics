import Link from "next/link";

type CardProductType = {
    id: string | number,
    name: string,
    brand?: string,
    price?: number,
    year?: string,
    categorySlug: string
}

const CardProduct:React.FC<CardProductType> = ({id,name,brand,price,year,categorySlug}) => {

    return ( 
    <Link href={{
        pathname: '../item',
        query: {id: id, categorySlug}
    }}>
        <article className="bg-neutral-900 px-6 py-4  max-w-[400px] min-w-[300px] text-white rounded-md">
            <div className="w-full h-[200px] bg-neutral-600"></div>
            <div className="">{name}</div>
            <div className="">{brand}</div>
            <div className="">{price}</div>
        </article> 
    </Link>
    
    );
}
 
export default CardProduct;