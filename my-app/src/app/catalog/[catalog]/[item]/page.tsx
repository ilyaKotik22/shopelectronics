import FilterMenu from "@/components/features/filterMenu/FilterMenu";
import MenuBlock from "@/components/ui/menuBlock";

const Page = () => {
    return ( 
    <section className="grid grid-cols-1 lg:grid-cols-[2fr_10fr] gap-6 lg:gap-10  w-[90vw]">
        <aside className="">
            <FilterMenu/>
        </aside>
        <main>
            <MenuBlock/>
        </main>
    </section> 
    );
}
 
export default Page;