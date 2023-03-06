export interface CreatePlace {
  store_id: number
  name: string
  active: boolean
}

export interface Place extends CreatePlace{
  id: number
}

export interface PlaceWithDetails extends Place{
  sales: number
  expenses: number
}