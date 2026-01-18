import { MyButton } from "@/components/ui/MyButton";
import { createApiUpdateBasket } from "@/lib/createApiUpdateBasket";

type CartBasket = {
    title: string,
    quantity: number,
    price: number,
    id: string
}

const CartBasket = ({title,quantity,price,id}: CartBasket) => {
    return ( 
    <li className="flex justify-between mt-4 max-w-[600px]">
        <section className="w-[35%] ">
            <p>{title}</p>
        </section>
       <section className="w-[25%] md:w-[35%] flex justify-between">
        <div>{quantity} шт</div> 
        <div className="hidden md:block">{price} рублей</div>
       </section>
        <section className="w-[15%] flex justify-between max-w-[100px]">
            <form className="mr-2" action={createApiUpdateBasket}>
                <input  type="hidden" name="ItemId" value={id} />
                <input type="hidden" name="action" value={"+"}/>
                <MyButton>+</MyButton>
            </form>
            <form action={createApiUpdateBasket}>
                <input type="hidden" name="ItemId" value={id} />
                <input type="hidden" name="action" value={"-"}/>
                <MyButton>-</MyButton>
            </form>
            
        </section>
    </li> );
}
 
export default CartBasket;