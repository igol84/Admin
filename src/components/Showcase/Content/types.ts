import {Field} from "../../Form/types";


export interface FormData{
  name: Field<string>
  title: Field<string>
  desc: string
  url: Field<string>
  files: File[] | undefined
}

export type FieldNames = keyof Omit<FormData, 'desc'>