import {Item, Product} from "./base";

export interface OutputItems {
  products?: NewProducts[]
  items: Item[]
}

export type NewProducts = Omit<Product, 'id'>

