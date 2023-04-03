import {Field} from "../../../Form/types";

export interface SizeFormFields {
  size: Field<string>
  length: Field<string>
  price: Field<string>
}

export type SizeFieldNames = keyof SizeFormFields
