
import { products } from "@/config/menuItems";
import CardProduct from "./cardProduct";



const MenuBlock = async () => {
    
    // useEffect(()=>{
    //     console.log(searchParamsm)
    // },[searchParamsm])
    return ( <ul className="flex gap-5 flex-wrap">
        {products.map(el=>{
            return(
                <li key={el.id}>
                    <CardProduct
                    name={el.name}
                    price={el.price}
                    id={el.id}
                    brand={el.brand}
                    />
                </li>
                
            )
        })}
    </ul> 
    );
}
 
export default MenuBlock;