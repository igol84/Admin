import {Field} from "../Form/types";

export interface ItemForm {
  id: number
  name: string
  qty: number
  buy_price: number
  date_buy: string
}

export type FormFields = {
  id: number | null
  qty: Field<string>
  price: Field<string>
}

export type FieldNames = keyof Omit<FormFields, 'id'>

