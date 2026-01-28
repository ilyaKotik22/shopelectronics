"use client"
import { authAction, loginAction } from "@/actions/auth.action";
import { MyButton } from "@/components/ui/MyButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export type FormState = {
    errors?: {
        general: string[]
    }
    message?: string
    success?: boolean
    login?: string,
    password?: string
    ok?: boolean
}
const initialState: FormState = {}
const Auth = () => {
    const router = useRouter()
    const [ isLogin, setIsLogin] = useState<boolean>(true)
    const [state, formAction, pending] = useActionState<FormState,FormData>( authAction,initialState)
    const [stateLogin, formActionLogin, pendingLogin] = useActionState<FormState,FormData>( loginAction,initialState)
    useEffect(() => {
        console.log('общий ответ от stateLogin')
        console.log(stateLogin)
        
    if (stateLogin.success) {
        
      signIn("credentials", {
        login: stateLogin.login || "", // можно передать из state, если добавишь
        password: stateLogin.password || "",
        redirect: false,
      }).then((result) => {

        if (result?.ok) {
          router.push('/')
          router.refresh() 
        } else {
          // сюда можно вывести ошибку авторизации от next-auth
        }
      })
    }
  }, [stateLogin])
    return (  
        <section className="flex dark:text-black text-white justify-center w-[88vw]  items-center md:w-[94vw] h-[70vh]  ">
     
        <form className="bg-neutral-800 dark:bg-neutral-200 w-screen md:w-[40vw] max-w-[550px] h-max px-7 py-5 rounded-md" action={isLogin ? formActionLogin :formAction}>
          
            <div className="mb-5 text-center text-[24px]  ">{isLogin ? 'Вход' : 'Регистрация'}</div>
            
            
            <div className="mb-2">Логин</div>
            <input className="bg-neutral-900 dark:bg-neutral-400 w-full mb-5 px-3 py-2 " type="text"  name="login"/>
            {state.errors && <>ошибка</>}
            {stateLogin.errors && <>ошибка</>}
            <div className="mb-2">Пароль</div>
            <input className="bg-neutral-900 dark:bg-neutral-400 w-full mb-5 px-3 py-2 " type="text"  name="password"/>
            <section className="block md:flex justify-between">
              {isLogin ? 
              <>
                <MyButton as="button" className="mt-5" >войти</MyButton>
                <div  onClick={()=> setIsLogin(e=> !e)} className="bg-white mt-5 cursor-pointer w-max text-neutral-800 px-5 py-2 rounded-md hover:bg-neutral-400 transition-all duration-150" >зарегистрироваться</div>
              </>
              :
              <>
                <MyButton as="button" type="submit" className="mt-5" >зарегистрироваться</MyButton>
                <div onClick={()=> setIsLogin(e=> !e)} className="bg-white cursor-pointer w-max mt-5 text-neutral-800 px-5 py-2 rounded-md hover:bg-neutral-400 transition-all duration-150">войти </div>
              </>}
              
            </section>
            
        </form> 
   
        </section>
   
    );
}
 
export default Auth;