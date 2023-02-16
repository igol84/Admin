export const toTrimTheRow = (field: string) => (data: any) => {
  return {...data, [field]: data[field].trim()}
}