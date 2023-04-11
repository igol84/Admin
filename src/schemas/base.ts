export interface Item {
  id: number
  prod_id: number
  store_id: number
  qty: number
  buy_price: number
  date_buy: Date
  product: Product
}

export interface Product {
  id: number,
  type: string,
  name: string,
  price: number,
  qty: number,
  shoes: null | Shoes
}

export interface Shoes {
  size: number,
  color: string,
  width: string,
  length: number
}

export interface Expense {
  id: number
  place_id: string
  desc: string
  date_cost: Date
  cost: number
}

export interface Seller {
  id: number
  store_id: number
  name: string
  active: boolean
}

export interface Place {
  id: number
  store_id: number
  name: string
  active: boolean
}

export interface Sale{
  id: number
  date_time: Date
  sale_line_items: SaleLineItem[]
  seller_id: number
  seller: Seller
  place_id: number
  place: Place
}

export interface SaleLineItem{
  sale_id: number
  item_id: number
  sale_price: number
  qty: number
  item: Item
}

