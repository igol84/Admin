import {Sale, SaleLineItem} from "./base";

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
  place_id: number
  seller_id: number
  date_time: string
  sale_line_items: CreateSaleLineItemForSale[]
}

export interface EndSale {
  sale: CreateSale
}

export interface UpdatedNewSaleItem {
  prodId: number
  qty: number
  newPrice: number
}

export interface RemovedNewSaleItem {
  prodId: number
  price: number
}


export interface OutputEndSale {
  sale: Sale
}



export interface EditSLIPrice {
  old_sli: Omit<SaleLineItem, 'item'>
  new_sli: Omit<SaleLineItem, 'item'>
}