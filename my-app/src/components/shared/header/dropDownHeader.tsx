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
    <section ref={menuRef} className={'flex fixed top-0 text-white z-300 '  + viss}>
        <ul className={'mt-[90px] bg-neutral-900 h-max min-w-[320px]  max-w-[320px] w-max px-2 py-4 max-w-[320px] border-2 border-neutral-900 rounded-md'}>
            <li className="px-5 w-full mt-5 items-center">
                
                <section className="w-full flex justify-between">
                    <section className="flex items-center cursor-pointer" onClick={()=>router.push('/')}>
                        logo
                    </section>
                     <section onClick={()=> login ? router.push(`/basket/${login}`) : router.push(`/auth`)} className="cursor-pointer w-max px-5 ">
            <div className=""><svg className="w-6 h-6 text-white m-auto  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
</svg>
</div>
            <div  className="">корзина</div>
        </section>
                </section>
                
            </li>
            <li className="w-[90%] h-[2px] ml-5 my-2 bg-neutral-400"></li>
           {categoris.map(el=>{
            return(
                <li className="px-4 py-1 hover:bg-white hover:text-gray-950 duration-300 border-2 border-neutral-900 rounded-md cursor-pointer " 
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