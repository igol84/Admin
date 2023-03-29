import {Field} from "../../../Form/types";

export interface FormFields {
  id: number | null
  name: Field<string>
  price: Field<string>
}

export type FieldNames = keyof Omit<FormFields, 'id'>
