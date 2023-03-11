import {ProductType} from "../../schemas/items";

type Field<T> = {
  value: T
  error: string
}

export interface SizeField {
  size: number
  qty: string
  length: string
}

export type FormFields = {
  name: Field<string>
  priceBuy: Field<string>
  priceSell: Field<string>
  productType: Field<ProductType>
  qty: Field<string>
  color: Field<string>
  width: Field<string>
  sizes: SizeField[]
}

export type FieldNames = keyof Omit<FormFields, 'sizes'>

export interface RangeSizesType {
  from: number
  to: number
}

export interface SetterFieldCreator {
  (
    field: FieldNames,
    valid?: (value: any) => string
  )
    : (value: string) => void
}

export interface OnConcreteFieldChange {
  (field: {size: number, value: string}) : void
}
export interface OnSizeFieldChange {
  (fieldName: string)
    : OnConcreteFieldChange
}