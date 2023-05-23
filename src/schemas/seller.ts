import {Seller} from "./base";

export type CreateSeller = Omit<Seller, 'id'>

export interface SellerWithDetails extends Seller{
  email?: string
  role?: string
  sales: number
}