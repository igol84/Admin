export enum Module {
  product = 'product',
  shoes = 'shoes'
}

interface ViewSimpleProduct {
  id: number
  module: Module.product
  name: string
  price: number
  qty: number
}

export interface ViewSize {
  prod_id: number
  size: number
  price: number
  qty: number
}

export interface ViewWidth {
  width: string
  sizes: ViewSize[]
}

export interface ViewColor {
  color: string
  widths: ViewWidth[]
}

export interface ViewShoes {
  type: string
  module: Module.shoes
  name: string
  colors: ViewColor[]
}

export type ViewProduct = ViewSimpleProduct | ViewShoes

