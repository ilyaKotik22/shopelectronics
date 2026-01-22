import { BaseItem } from "@/types/item";
import { MyButton } from "./MyButton";
import { basketAddAction } from "@/actions/basketAdd.action";


const ItemPage = ({ item }: { item: BaseItem }) => {
    const { title, price, categorySlug, id} = item
   
    return (
        <main className="text-white mt-[5vh]">
            <form action={basketAddAction} className="block md:flex w-[90vw] justify-between">
                <section className="w-[35%]">
                    
                </section>
                <section className=" md:w-[40vw]">
                    <input type="hidden" name="productId" value={id} />
                    <h1 className="text-[24px]">{title}</h1>
                    <h3 className="mb-2">категория: {" " + categorySlug}</h3>
                    <h3 className="text-[18px] mb-5">{price + " "}рублей</h3>
                        <section className="bg-neutral-800 px-7 py-3 rounded-md">
                            <div className="">{item.laptopSpec && 
                            Object.entries(item.laptopSpec)
                            .map(([key, value]) => (
                            <div className="flex justify-between border-b-1 mb-2 border-neutral-500 " key={key}>
                                <div className="">
                                    {key}</div>
                                    <div className="
                                    ">{value}</div>
                            </div>))
                        }</div>
                    
                        <div className="">{item.smartphoneSpec && 
                            Object.entries(item.smartphoneSpec)
                            .map(([key, value]) => (
                            <div className="flex justify-between border-b-1 mb-2 border-neutral-500 " key={key}>
                                <div className="">{key}:</div>
                                <div className="">{value}</div>
                                
                            </div>))
                        }</div>

                        <div className="">{item.tvSpec && 
                            Object.entries(item.tvSpec)
                            .map(([key, value]) => (
                            <div className="flex justify-between border-b-1 mb-2 border-neutral-500 " key={key}>
                                <div className="">{key}:</div>
                                <div className="">{value}</div>
                                
                            </div>))
                        }</div>
                        </section>
                        <section className="mt-5">
                            <MyButton >добавить в корзину</MyButton>
                        </section>
                </section>
            </form>

        </main> 
        );
}
 
export default ItemPage;