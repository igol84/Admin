export interface Shoes {
  size: number,
  color: string,
  width: string,
  length: number
}

export interface Product {
  id: number,
  type: string,
  name: string,
  price: number,
  qty: number,
  shoes: null | Shoes
}

