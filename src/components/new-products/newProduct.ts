import {defaultSizesLength} from "./data";

export interface NewProduct {
  id?: number
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
  width: WidthType
  color: string
  sizes: Size[]
}

interface Size {
  size: number
  length: number
  qty: number
}

export enum WidthType {
  medium = 'Medium',
  wide = 'Wide'
}

export const getDefaultSeizesLength = (selectedSize: number) => {
  let sizeLength = ''
  for (let size in defaultSizesLength) {
    if (size == selectedSize.toString()) {
      sizeLength = defaultSizesLength[size].toString()
      break
    }
  }
  return sizeLength
}
