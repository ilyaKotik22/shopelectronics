export type TvSpec = {
  productId: string
  screenInch?: number | null
  resolution: string
  panelType: string
  refreshHz?: number | null
  smartTv: boolean
}

export type LaptopSpec = {
  productId: string
  cpu: string
  ramGb: number
  storageGb: number
  gpu?: string | null
}

export type SmartphoneSpec = {
  productId: string
  screenInch?: number | null
  batteryMah?: number | null
  cameraMp?: number | null
  refreshHz?: number | null
  waterproof?: string | null
}
export interface BaseItem {
  id?: string;
  title?: string | null;
  description?: string | null;   
  brand?: { id: string; name: string } | null;
  brandId?: string | null;
  categorySlug: string | null;
  price?: number | null;
  rating?: number | null;
  laptopSpec?: LaptopSpec | null;
  smartphoneSpec?: SmartphoneSpec | null;
  tvSpec?: TvSpec | null;
}
 
