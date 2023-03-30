import {Field} from "../../../Form/types";

export interface FormFields {
  name: Field<string>
  price: Field<string>
}

export type FieldNames = keyof FormFields
