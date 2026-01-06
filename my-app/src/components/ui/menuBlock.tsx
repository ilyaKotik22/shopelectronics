
import { products } from "@/config/menuItems";
import CardProduct from "./cardProduct";



const MenuBlock = async ({items}) => {
 
    // useEffect(()=>{
    //     console.log(searchParamsm)
    // },[searchParamsm])
    return ( <ul className="flex gap-5 flex-wrap">
        {items.map(el=>{
            return(
                <li key={el.id}>
                    <CardProduct
                    name={el.title}
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