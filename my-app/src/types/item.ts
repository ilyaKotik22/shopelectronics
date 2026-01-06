
export type LaptopSpec = {
    productId:string 
    cpu: string
    gpu: string
    ramGb: number
    storegGb: number
}
export type SmartphoneSpec = {
    productId: string
    screenInch: number
    batteryMah: number
    cameraMp: number
    refreshHz: number
    waterproof: string
}
export type TvSpec = {
    productId: string
    screenInch: number
    resolution: string
    panelType: string
    refreshType: number
    smartTv: boolean
}
export type BaseItem = {
    id: string
    title: string
    description: string
    brand: {id: string, name: string}
    brandId?: string
    categorySlug: string
    price: number
    rating: string
    laptopSpec?: LaptopSpec
    smartphoneSpec?: SmartphoneSpec
    tvSpec?:TvSpec
}
 
