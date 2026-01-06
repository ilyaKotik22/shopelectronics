import { BaseItem, LaptopSpec } from "@/types/item";


const ItemPage = ({ item }: { item: BaseItem }) => {
    const { title, price, categorySlug, } = item
   
    return (
        <main>
            <section className="flex w-screen">
                <section className="w-[35%]">
                    dsa
                </section>
                <section className="w-[50vw]">
                    <h1>{title}</h1>
                    <h2>{price}р</h2>
                    <h3>{categorySlug}</h3>
    
                        <div className="">{item.laptopSpec && 
                            Object.entries(item.laptopSpec)
                            .map(([key, value]) => (
                            <div key={key}>
                                {key}:{value}
                            </div>))
                        }</div>
                    
                        <div className="">{item.smartphoneSpec && 
                            Object.entries(item.smartphoneSpec)
                            .map(([key, value]) => (
                            <div key={key}>
                                {key}:{value}
                            </div>))
                        }</div>

                        <div className="">{item.tvSpec && 
                            Object.entries(item.tvSpec)
                            .map(([key, value]) => (
                            <div key={key}>
                                {key}:{value}
                            </div>))
                        }</div>
                </section>
            </section>

        </main> 
        );
}
 
export default ItemPage;