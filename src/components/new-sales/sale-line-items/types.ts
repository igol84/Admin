export interface ViewNewSaleLineItem {
  prod_id: number
  name: string
  price: number
  qty: number
}

export interface ViewSellersAndPlaces {
  selectedSellerId: string
  sellers: ViewSeller[]
  selectedPlaceId: string
  places: ViewPlace[]
}

export interface ViewSeller {
  id: number
  name: string
}

export interface ViewPlace {
  id: number
  name: string
}