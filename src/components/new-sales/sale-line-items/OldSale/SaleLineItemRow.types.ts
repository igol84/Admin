import {Field} from "../../../Form/types";

export interface FormFields {
  price: Field<string>
}

export type FieldNames = keyof FormFields

