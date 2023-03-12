export interface Product {
  type: string
  name: string
  price: number
  id: number
  shoes: Shoes
}

export interface Shoes {
  id: number
  color: string
  size: number
  length?: number
  width: string
}