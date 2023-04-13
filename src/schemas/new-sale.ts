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

export interface UpdatedNewSaleItem {
  prodId: number
  qty: number
  newPrice: number
}

export interface RemovedNewSaleItem {
  prodId: number
  price: number
}