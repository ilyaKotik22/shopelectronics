import { BaseItem } from "@/types/item";
import CardProduct from "./cardProduct";
type MenuBlockProps = {
  items: BaseItem[];
};
const MenuBlock = async ({items}: MenuBlockProps) => {
 
    return ( <ul className="flex gap-5 flex-wrap">
        {items.map((el:BaseItem)=>{
            return(
                <li key={el.id}>
                    <CardProduct
                    name={el.title}
                    categorySlug={el.categorySlug}
                    price={el.price}
                    id={el.id}
                    brand={el.brand && el.brand.name}
                    />
                </li>
                
            )
        })}
    </ul> 
    );
}
 
export default MenuBlock;