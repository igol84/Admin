import {formatISO, isDate} from "date-fns";

export const toTrimTheRow = (field: string) => (data: any) => {
  return {...data, [field]: data[field].trim()}
}

export const formatISODate = (date: Date): string | Date => {
  if (isDate(date))
    return formatISO(date, { representation: 'date' })
  else
    return date
}