export type Interval = 'month' | 'year'


export interface PlaceView {
  id: number
  name: string
}

export interface ReportData {
  data: string
  proceeds: number
  costs: number
}
