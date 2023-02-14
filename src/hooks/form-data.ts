export const trimmedRow = (field: string) => (data: any) => {
  return {...data, [field]: data[field].trim()}
}