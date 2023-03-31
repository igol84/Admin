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

export interface EditSimpleProduct {
  id: number
  new_name: string
  new_price: number
}

export interface EditSize {
  id: number
  size: number
  length: number
  price_for_sale: number | null
}

export interface EditColor {
  name: string
  color: string
  new_color: string
  price_for_sale: number | null
}

export interface EditShoes {
  name: string
  new_name: string
  price_for_sale: number | null
}
