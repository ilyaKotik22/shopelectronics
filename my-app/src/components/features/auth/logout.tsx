'use client'
import { MyButton } from "@/components/ui/MyButton";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type logoutPopupType = {
    vis: boolean
    ref: () => void
}

const LogoutPopup = ({vis,ref}:logoutPopupType) => {
    const router = useRouter()

    const handleLogout = async () => {
    try{
        await signOut({
            redirect:false,
            callbackUrl: "/"
        })
        ref()
        router.push('/auth')
        router.refresh()
        } catch (error){
            console.log(error)
        }
    }
    return ( 
        <>
            {vis &&
            <section className="fixed flex justify-center items-center  left-0 top-0  z-50 w-screen h-screen">
                <section className="fixed flex justify-center items-center opacity-55 left-0 top-0  z-50 bg-neutral-950 w-screen h-screen"></section>
                <section className="w-[20vw] h-[20vw] opacity-100 px-5 py-3 z-60 bg-neutral-800 text-white rounded-md">
                    <section className="text-center text-[24px] mb-12">
                        Выйти из профиля?
                    </section>
                    <section className="flex justify-between">
                        <MyButton onClick={handleLogout}>Выйти</MyButton>
                        <MyButton onClick={ref}>Отмена</MyButton>
                    </section>
                    
                </section>
            </section>}
        </>
        
     
    );
}
 
export default LogoutPopup;