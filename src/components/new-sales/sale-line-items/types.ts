export interface ViewNewSaleLineItem {
  prod_id: number
  name: string
  price: number
  qty: number
}

export interface ViewFormData {
  selectedSellerId: string
  sellers: ViewSeller[]
  selectedPlaceId: string
  places: ViewPlace[]
  selectedDate: string
  onSetSelectedDate: (date: string) => void
}

export interface ViewSeller {
  id: number
  name: string
}

export interface ViewPlace {
  id: number
  name: string
}

export interface ViewSale {
  id: number
  seller: string
  place: string
  salLineItems: viewSaleLineItem[]
}

export interface viewSaleLineItem {
  saleId: number
  itemId: number
  name: string
  salePrice: number
  qty: number
}