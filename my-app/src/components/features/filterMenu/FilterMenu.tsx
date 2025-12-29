'use client'
import { Checkbox } from "@/components/ui/checkbox"
import MyInput from "@/components/ui/MyInput";
import { filtersByCategory } from "@/config/filterMenu";
import { Filter } from "@/types/filter";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type FilterValue = string | string[] | undefined;

type FilterState = Record<string, FilterValue>;
const FilterMenu = () => {
    
    const params: {catalog: string, item: string} = useParams()
    const [rangeMin,setRangeMin] = useState<string>('')
    const [rangeMax,setRangeMax] = useState<string>('')
    const [error,setError] = useState<string>('')
    console.log(params)
    const [filterMas, setFilterMas] = useState<FilterState>({})
    const handleCheckBox = (catalog:{name: string},item:string) => {

        if (catalog.name in filterMas ){
            let repit = 0
            let newCatalog:string[] =  filterMas[catalog.name] || []
            for (const i in newCatalog as []){
               
                if (newCatalog[i] === item) repit++
            }
            if (repit > 0){
                newCatalog = newCatalog.filter((el)=> el !== item)
            } else{
                 console.log('pushed')
                newCatalog.push(item)
            }
            
            const newFilterMas = {...filterMas, [catalog.name]: newCatalog}
            setFilterMas(newFilterMas)
        }else{
            console.log('pushed1')
            const newFilterMas = {...filterMas, [catalog.name]: [item]}
            setFilterMas(newFilterMas)
        }
        
        
    }
   
    useEffect(() => {
        console.log(filterMas)
    },[filterMas])
   



    return ( 
    <section className="">
        <ul className="text-white">
            {filtersByCategory[params.catalog].map(ell=>{
                return (
                <li className="pb-5" key={ell.id}>
                    <span className="pb-2">{ell.name}</span>
                   
                    <div className="">
                       {ell.type === 'checkbox' && <ul>{ell.choices.map(el=><li key={el as string} ><Checkbox className="mr-2" onCheckedChange={()=>handleCheckBox(ell,el)}/>{el as string}</li>)}</ul>}
                       {ell.type === 'range' && 
                       <div>
                        <div className="">от 
                            <MyInput
                            label="Имя"
                            value={rangeMin }
                            onChange={setRangeMin}
                            error={error}
                            placeholder="цена"
                            className="w-20 px-1 py-0 h-3 ml-2"
                        />
                        </div>
                        <div className="">до
                             <MyInput
                            label="Имя"
                            value={rangeMax }
                            onChange={setRangeMax}
                            error={error}
                            placeholder="цена"
                            className="w-20 px-1 py-0 h-3 ml-2"
                        />
                        </div>
                        </div>}
                    </div>
                </li>)
            })}
        </ul>
      
    </section> 

    );
}
 
export default FilterMenu;