export interface CreateExpense {
  place_id: string
  desc: string
  date_cost: Date
  cost: number
}

export interface Expense extends CreateExpense{
  id: number
}

export interface UpdateExpense extends CreateExpense{
  id: number
}