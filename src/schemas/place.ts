import {Place} from "./base";

export type CreatePlace = Omit<Place, 'id'>

export interface PlaceWithDetails extends Place{
  sales: number
  expenses: number
}