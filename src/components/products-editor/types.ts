export enum Module {
  product = 'product',
  shoes = 'shoes'
}

export interface ViewSimpleProduct {
  id: number
  name: string
  qty: number
  price: number
  module: Module.product
}

export interface ViewSize {
  prod_id: number
  size: number
  length: number
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
  module: Module.shoes
  type: string
  name: string
  colors: ViewColor[]
}

export type ViewProduct = ViewSimpleProduct | ViewShoes

export const isSimpleProduct = (product: ViewProduct): product is ViewSimpleProduct => {
  return product.module === Module.product
}

export const isShoes = (product: ViewProduct): product is ViewShoes => {
  return product.module === Module.shoes
}