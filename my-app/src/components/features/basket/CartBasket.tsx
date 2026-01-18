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
    <li className="flex justify-between mt-4 max-w-[1400px]">
        <section className="w-[20%] ">
            <p>{title}</p>
        </section>
       <section className="w-[25%] flex justify-between">
        <b>{quantity} шт</b> 
        <b>{price} рублей</b>
       </section>
        <section className="w-[15%] flex justify-between max-w-[100px]">
            <form action={createApiUpdateBasket}>
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