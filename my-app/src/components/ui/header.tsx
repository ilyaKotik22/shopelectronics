'use client'
import { useEffect, useRef, useState } from "react";
import MyInput from "./MyInput";
import DropDownHeader from "./dropDownHeader";

const Header = () => {
    const [searchValue,setSearchValue] = useState<string>('')
    const [error,setError] = useState<string>('')
    const [dropDown,setDropDown] = useState<boolean>(false)

    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!dropDown) return

        const handleClickOutside = (event: MouseEvent) => {
        // Если кликнули внутри кнопки открытия — ничего не делаем
        if (buttonRef.current?.contains(event.target as Node)) {
            return
        }

        // Если кликнули НЕ внутри меню — закрываем
        if (!menuRef.current?.contains(event.target as Node)) {
            setDropDown(false)
        }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
        document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [dropDown])

    return (
    <>
        <header className="fixed top-0 left-0 right-0 z-50 w-full flex gap-5 justify-center items-center px-10 py-5 text-white bg-neutral-900">
        <section>
            logo
        </section>
        <section onClick={()=>setDropDown(e=>!e)} className="min-w-[50px] w-[50px] h-[50px] border-2 border-white px-2 py-2 rounded-md cursor-pointer">
            <div className="w-full bg-white h-0.5 mt-1 text-gray-950 ">.</div>
            <div className="w-full bg-white h-0.5 mt-2  text-gray-950">.</div>
            <div className="w-full bg-white h-0.5 mt-2 text-gray-950">.</div>
        </section>
        <section>
            <MyInput 
            label="Имя"
            value={searchValue }
            onChange={setSearchValue}
            error={error}
            placeholder="Введите имя"
            className="w-[50vw]"
            />
        </section>
        <section className="cursor-pointer">
            <div className="">foto</div>
            <div className="">войти</div>
        </section>
        <section className="cursor-pointer">
            <div className="">foto</div>
            <div className="">корзина</div>
        </section>
    </header>
    <DropDownHeader menuRef={menuRef} vis={dropDown}/>
    </>
     );
}
 
export default Header;