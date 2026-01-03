'use client'
import { Checkbox } from "@/components/ui/checkbox"
import MyInput from "@/components/ui/MyInput";
import { filtersByCategory } from "@/config/filterMenu";
import { useParams, usePathname, useRouter, useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";


const FilterMenu = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams<{catalog:string, item:string}>()

    const [rangeMin,setRangeMin] = useState('')
    const [rangeMax,setRangeMax] = useState('')
    const [error,setError] = useState('')

    const updateQueryParam = (key:string, value: string | null) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === null || value === '') {
            params.delete(key)
        } else {
            params.set(key, value)
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    const toggleCheckboxParam = (val,key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        const current = params.getAll(key)
        const currantValue = val+ '.' + value
        if (current.includes(currantValue)) {
            params.delete(key)
            current.filter(v => v !== currantValue).forEach(v => params.append(key,v))
        } else {
            params.append(key, currantValue)
        }

        router.push(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        setRangeMax('')
        setRangeMin('')
       
    }, [params.catalog])
  
    return ( 
    <section className="">
        <ul className="text-white"> 
            {filtersByCategory[params.catalog]?.defaultFilter.map(ell => (
                <li className="pb-5" key={ell.id}>
                    <span className="pb-2">{ell.name}</span>

                    <div className="">
                        
                        {ell.type === 'checkbox' && (
                            <ul>
                                {ell.choices.map(choice => {
                                    const isChecked = searchParams.getAll(ell.id).includes('defaultFilter' + '.' +choice)
                                 
                                    return (
                                        <li key={choice}>
                                            <Checkbox
                                                className="mr-2"
                                                checked={isChecked}
                                                onCheckedChange={(checked) => {
                                                    toggleCheckboxParam('defaultFilter',ell.id, choice)
                                                }}
                                            />
                                            {choice}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        
                    </div>
                </li>
            ))}
            {filtersByCategory[params.catalog]?.filters.map(ell => (
                <li className="pb-5" key={ell.id}>
                    <span className="pb-2">{ell.name}</span>

                    <div className="">
                        
                        {ell.type === 'checkbox' && (
                            <ul>
                                {ell.choices.map(choice => {
                                    const isChecked = searchParams.getAll(ell.id).includes(filtersByCategory[params.catalog].value + '.' +choice)
                                    
                                    return (
                                        <li key={choice}>
                                            <Checkbox
                                                className="mr-2"
                                                checked={isChecked}
                                                onCheckedChange={(checked) => {
                                                    toggleCheckboxParam(filtersByCategory[params.catalog].value,ell.id, choice)
                                                }}
                                            />
                                            {choice}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                        {ell.type === 'range' && (
                            <div>
                                <div className=""> от
                                    <MyInput
                                        label="Имя"
                                        value={rangeMin}
                                        onChange={(val) => {
                                            setRangeMin(val)
                                            updateQueryParam('min', val)
                                        }}
                                        error={error}
                                        placeholder="цена"
                                        className="w-20 px-1 py-0 h-3 ml-2"
                                    />

                                </div>
                                    <div className="">до
                                        <MyInput
                                        label="Имя"
                                        value={rangeMax}
                                        onChange={(val) => {
                                            setRangeMax(val)
                                            updateQueryParam('max', val)
                                        }}
                                        error={error}
                                        placeholder="цена"
                                        className="w-20 px-1 py-0 h-3 ml-2"
                                        />
                                    </div>
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    </section> 

    );
}
 
export default FilterMenu;