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
  place_id: number
  desc: string
  date_cost: string
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

export interface Sale {
  id: number
  date_time: string
  sale_line_items: SaleLineItem[]
  seller_id: number
  seller: Seller
  place_id: number
  place: Place
}

export interface SaleLineItem {
  sale_id: number
  item_id: number
  sale_price: number
  qty: number
  item: Item
}

export interface Showcase {
  name: string
  color: string
  brand_id: number | null
  title: string
  title_ua: string
  desc: string
  desc_ua: string
  url: string
  youtube: string
  active: boolean
}

export interface ShowcaseDirs {
  name: string
  images: string[]
}

export interface ShowcaseWithImages extends Showcase {
  images: string[]
}

export interface Brand {
  id: number
  name: string
  title: string
  title_ua: string
  desc: string
  desc_ua: string
  url: string
  active: boolean
}

export interface BrandWithImage extends Brand {
  image: string | undefined
}