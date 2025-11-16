import { BasketPage } from "../../pages/BasketPage/BasketPage"
import { CardPage } from "../../pages/CartPage/CartPage"
import { HomePage } from "../../pages/HomePage/HomePage"
import { ProductPage } from "../../pages/ProductPage/ProductPage"
import { ProfilePage } from "../../pages/ProfilePage/ProfilePage"

export type MyRoutesType = {
    url: string
    component: React.ComponentType
}
export const MyRoutes = [
    {
        url: '/',
        component: HomePage
    },
    {
        url: '/Cardpage/:i',
        component: CardPage
    },
    {
        url: '/productpage',
        component: ProductPage
    },
    {
        url: '/profilepage',
        component: ProfilePage
    },
]
export const MyRoutesIsAuth = [

        {
            url: '/basketpage',
            component: BasketPage
        }
    
]