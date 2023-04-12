import {Item, SaleLineItem} from "./base";

export interface PutOnSale {
  productId: number
  salePrice: number
  qty: number
}


export interface NewSaleLineItem {
  itemId: number
  salePrice: number
  qty: number
}

export interface CreateSaleLineItemForSale {
  qty: number
  item_id: number
  sale_price: number
}

export interface CreateSale {
  sale_line_items: CreateSaleLineItemForSale[]
}

export interface EndSale {
  sale: CreateSale
}
