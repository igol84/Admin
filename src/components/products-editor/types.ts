import {Product} from "../../schemas/products-editor";

export interface ViewProduct extends Product {

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
  type: string
  name: string
  colors: ViewColor[]
}
