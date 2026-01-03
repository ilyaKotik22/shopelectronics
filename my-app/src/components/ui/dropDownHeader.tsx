import { headerConfig } from "@/config/header"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type DropDownHeaderType = {
    vis: true | false
    menuRef: string
}
type DropDownItem = {
    name: string
    underItems: string[]
}
const DropDownHeader: React.FC<DropDownHeaderType> = ({vis,menuRef}) => {

    const [underMenu, setUnderMenu] = useState<DropDownItem>()
    const [catalog, setCatalog] = useState<string>('')
    const router = useRouter()
    const categoris: DropDownItem[] = headerConfig.dropDownMenu
    const viss = vis ? 'block' : 'hidden'
    return ( 
    <section ref={menuRef} className={'flex fixed top-0 text-white '  + viss}>
        <ul className={'mt-[90px] bg-neutral-900 h-max min-w-[320px]  max-w-[320px] w-max px-2 py-4 max-w-[320px] border-2 border-neutral-900 rounded-md'}>
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