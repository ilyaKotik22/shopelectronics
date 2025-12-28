'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { filtersByCategory } from "@/config/filterMenu";
import { Filter } from "@/types/filter";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type FilterValue = string | string[] | undefined;

type FilterState = Record<string, FilterValue>;
const FilterMenu = () => {
    const params: {catalog: string, item: string} = useParams()
    console.log(params)
    const [filterMas, setFilterMas] = useState<FilterState>({})
    const handleCheckBox = () => {
        console.log(filterMas)
    }

    useEffect(()=>{
        const newFilter:FilterState = {}
        filtersByCategory[params.catalog].map((el:Filter)=>{
            newFilter[el.id] = ''
         
        })
        setFilterMas(newFilter)
        console.log(newFilter)
        console.log(params.catalog)
    },[params])

    return ( 
    <section>
        <ul>
            {filtersByCategory[params.catalog].map(el=>{
                return (
                <li key={el.id}>
                    <span>{el.name}</span>
                    <div className="">
                       {el.type === 'checkbox' && <ul>{el.choices.map(el=><li key={el as string} ><Checkbox onCheckedChange={()=>handleCheckBox()}/>{el as string}</li>)}</ul>}
                    </div>
                </li>)
            })}
        </ul>
      
    </section> 

    );
}
 
export default FilterMenu;