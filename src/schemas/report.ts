export type Interval = 'month' | 'year'

export interface SellerView {
  id: number
  name: string
}

export interface PlaceView {
  id: number
  name: string
}

export interface Report {
  data: string
  proceeds: number
  costs: number
}