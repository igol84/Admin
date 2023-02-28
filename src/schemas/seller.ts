export interface CreateSeller {
  store_id: number
  name: string
  active: boolean
}

export interface Seller extends CreateSeller{
  id: number
}

export interface UpdateSeller extends CreateSeller{
  id: number
}

export interface SellerWithDetails extends Seller{
  email?: string
  role?: string
  sales: number
}