
import { auth } from "@/auth";
import { basketGetAction } from "@/actions/basketGet.action";
import CartBasket from "./CartBasket";

const BasketMenu = async () => {
    const session = await auth()
    console.log(session)
    let menuItems
    try{
        menuItems = await basketGetAction(session?.user?.id as string)
    }catch(error){
        console.error(error)
    }
    console.log(menuItems)
    const sum = menuItems?.items.reduce((acc,item)=>{
        return acc + item.quantity * item.product.price
  
    },0)
    return ( 
        <section className="flex flex-wrap md:grid grid-cols-12 gap-5 text-white dark:text-black">
      
            <ul className="block col-span-8">
                {menuItems?.items.length ? menuItems?.items.map((cart)=> (
                     <CartBasket
                        key={cart.id}
                        id={cart.id}
                        title={cart.product.title}
                        quantity={cart.quantity}
                        price={cart.product.price}/>
                )) : <section>ошибка подгрузки товаров</section>}
            </ul>
            <section className="col-span-4 dark:bg-neutral-200 bg-neutral-800 px-7 py-5 rounded-md">
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