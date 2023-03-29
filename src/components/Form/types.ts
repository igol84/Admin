export type Field<T> = {
  value: T
  error: string
}

export type FieldSelect<T> = {
  value: T
  error: string
  items: T[]
}

export type FieldAutocomplete<T> = {
  value: T
  error: string
  items: T[]
  selected: T
}
