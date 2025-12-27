import { headerConfig } from "@/config/header"
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

    const categoris: DropDownItem[] = headerConfig.dropDownMenu
    const viss = vis ? 'block' : 'hidden'
    return ( 
    <section ref={menuRef} className={'flex text-white '  + viss}>
        <ul className={'mt-[90px] bg-neutral-900 h-max min-w-[320px]  max-w-[320px] w-max px-2 py-4 max-w-[320px] border-2 border-neutral-900 rounded-md'}>
           {categoris.map(el=>{
            return(
                <li className="px-4 py-1 hover:bg-white hover:text-gray-950 duration-300 border-2 border-neutral-900 rounded-md cursor-pointer" onClick={()=>setUnderMenu(el)} key={el.name}>
                    {el.name}
                </li>
            )
           })} 
        </ul>
        {
            underMenu ? <ul className={'mt-[90px] bg-neutral-900 h-max min-w-[320px] max-w-[320px] w-max px-2 py-4 border-2 border-neutral-900 rounded-md'}>
           {underMenu && underMenu.underItems.map(el=>{
            return(
                <li className="px-4 py-1 hover:bg-white hover:text-gray-950 duration-300 border-2 border-neutral-900 rounded-md cursor-pointers" key={el}>
                    {el}
                </li>
            )
           })}
        </ul> : <></>
        }
        
    </section> 
    );
}
 
export default DropDownHeader;