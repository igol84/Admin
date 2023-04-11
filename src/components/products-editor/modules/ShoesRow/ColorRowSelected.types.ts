import {Field} from "../../../Form/types";

export interface FormFields {
  color: Field<string>
  price: Field<string>
}

export type FieldNames = keyof FormFields
