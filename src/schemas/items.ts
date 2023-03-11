
export interface NewProducts {
  store_id: number
  type: ProductType
  name: string
  price_sell: number
  price_buy: number
  qty: number
  module: Modules
}

export enum ProductType {
  product = 'product',
  shoes = 'shoes'
}

export type Modules = null | Shoes
// --------------------------------------
export interface Shoes {
  width: string
  color: string
  sizes: Size[]
}

interface Size {
  size: number
  length: number
  qty: number
}



