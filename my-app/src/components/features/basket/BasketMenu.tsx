
import { auth } from "@/auth";
import { createApiGetBasket } from "@/lib/createApiGetBasket";
import CartBasket from "./CartBasket";

const BasketMenu = async () => {
    const session = await auth()
    console.log(session)
    const menuItems = await createApiGetBasket(session?.user?.id as string)
    console.log(menuItems)
    const sum = menuItems?.items.reduce((acc,item)=>{
        return acc + item.quantity * item.product.price
  
    },0)
    return ( 
        <section className="grid grid-cols-12 gap-5 text-white">
      
            <ul className="block col-span-8">
                {menuItems?.items.map((cart)=> (
                     <CartBasket
                        key={cart.id}
                        id={cart.id}
                        title={cart.product.title}
                        quantity={cart.quantity}
                        price={cart.product.price}/>
                ))}
            </ul>
            <section className="col-span-4 bg-neutral-800 px-7 py-5 rounded-md">
                <h1 className="text-[24px] mb-4">Общая стоимость:</h1>
                <ul className="mb-4">
                    {menuItems?.items.map((el)=>(
                        <li className="text-[12px]" key={el.id}>
                            - {el.product.title} x {el.quantity}шт
                        </li>
                    ))}
                </ul>
                <b className="text-[18px]">{sum} рублей</b>
            </section>
        </section>
        
     );
}
 
export default BasketMenu;