import { HEADER } from "@/config/header"
import { useRouter } from "next/navigation"
import { RefObject } from "react"

type DropDownHeaderType = {
    vis: true | false
    menuRef: RefObject<HTMLDivElement>
    login: string
}
type DropDownItem = { name: string; url: string; params: string; }

const DropDownHeader: React.FC<DropDownHeaderType> = ({vis,menuRef,login}) => {
    const router = useRouter()
    const categoris: DropDownItem[] = HEADER.dropDownMenu
    const viss = vis ? 'block' : 'hidden'
    return ( 
    <section ref={menuRef} className={'flex fixed top-0 text-white dark:text-black dark:border-neutral-200 z-300 '  + viss}>
        <ul className={'mt-[90px] bg-neutral-900 dark:bg-neutral-200 dark:border: h-max min-w-[320px]  max-w-[320px] w-max px-2 py-4 max-w-[320px] border-2 border-neutral-900 dark:border-neutral-200 rounded-md'}>
            <li className="px-5 w-full mt-5 items-center">
                
                <section className="w-full flex justify-between">
                    <section className="flex items-center cursor-pointer" onClick={()=>router.push('/')}>
                        logo
                    </section>
                     <section onClick={()=> login ? router.push(`/basket/${login}`) : router.push(`/auth`)} className="cursor-pointer w-max px-5 ">
            <div className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
</div>
            <div  className="">корзина</div>
        </section>
                </section>
                
            </li>
            <li className="w-[90%] h-[2px] ml-5 my-2 bg-neutral-400"></li>
           {categoris.map(el=>{
            return(
                <li className="px-4 py-1 hover:bg-white hover:text-gray-950 duration-300 border-2 border-neutral-900 dark:border-neutral-200 rounded-md cursor-pointer " 
                onClick={()=> router.push(`/catalog/`+el.url )} key={el.name}>
                    
                    {el.name}
                </li>
            )
           })} 
        </ul>
    </section> 
    );
}
 
export default DropDownHeader;