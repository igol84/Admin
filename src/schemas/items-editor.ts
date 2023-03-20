export interface Item {
  prod_id: number
  store_id: number
  qty: number
  buy_price: number
  date_buy: Date
  id: number
  product: Product
}

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
  length: number
  width: string
}


export interface Sale {
  sale_id: number
  date: string
  qty: number
  price: number
}

export interface UpdatedItem {
  id: number
  new_qty: number
  new_price: number
}

