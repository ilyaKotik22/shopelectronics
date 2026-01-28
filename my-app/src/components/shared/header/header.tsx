'use client'
import { RefObject, useEffect, useRef, useState } from "react";
import DropDownHeader from "./dropDownHeader";
import { useRouter } from "next/navigation";
import SearchBar from "@/features/searchBar/SearchBar"
import LogoutPopup from "@/features/auth/logout";
import ThemeToggle from "@/components/ui/ThemeToggle";

type User = {
  login:string
}
const Header = ({login}:User) => {
    

    const router = useRouter()
    const [dropDown,setDropDown] = useState<boolean>(false)
    const [logoutPopup,setLogoutPopout] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
  if (!dropDown) return;

  const handleClickOutside = (event: MouseEvent) => {
    // Если кликнули внутри кнопки — ничего не делаем (меню остаётся открытым)
    if (buttonRef.current?.contains(event.target as Node)) {
      return;
    }

    // Если кликнули НЕ внутри выпадающего меню — закрываем
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDropDown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
    }, [dropDown]);

    return (
    <>
        <header className="fixed top-0 left-0 right-0 z-[300] w-[100vw] flex gap-5 sm:justify-center justify-center items-center md:justify-center dark:text-black  py-5 text-white bg-neutral-900 dark:bg-neutral-200 sm:px-3 ">
        <section className="cursor-pointer hidden xl:block" onClick={()=> router.push('/')}>
            logo
        </section>
        <section onClick={()=>setDropDown(e=>!e)} className="min-w-[50px] w-[50px] h-[50px] border-2 border-white dark:border-black px-2 py-2 rounded-md cursor-pointer hover:bg-white  duration-150">
            <div className="w-full bg-white h-0.5 mt-1 text-gray-950 dark:bg-black" ></div>
            <div className="w-full bg-white h-0.5 mt-2  text-gray-950 dark:bg-black"></div>
            <div className="w-full bg-white h-0.5 mt-2 text-gray-950 dark:bg-black"></div>
        </section>
        <section>
            <SearchBar/>
        </section>
        {login ? <section onClick={()=> setLogoutPopout(ev=>!ev)} className="cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto" ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>{login}</section> :<section  onClick={()=> router.push('/auth')} className="cursor-pointer">
          
            <div className=""><svg className="w-6 h-6 text-white m-auto dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" />
</svg>
</div>
            <div className="">войти</div>
        </section>}
        
        <section onClick={()=> login ? router.push(`/basket/${login}`) : router.push(`/auth`)} className="cursor-pointer hidden xl:block">
            <div className=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="m-auto"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
</div>
            <div  className="">корзина</div>
        </section>
        <section>
          <ThemeToggle/>
        </section>
    </header>
      <section className="z-300">
        <DropDownHeader login={login} menuRef={menuRef as RefObject<HTMLDivElement>} vis={dropDown}/>
        <LogoutPopup ref={()=> setLogoutPopout(e=> !e)} vis={logoutPopup}/>
      </section>
      
    </>
     );
}
 
export default Header;