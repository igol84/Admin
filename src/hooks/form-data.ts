import {formatISO, isDate} from "date-fns";
import React from "react";

export const toTrimTheRow = (field: string) => (data: any) => {
  return {...data, [field]: data[field].trim()}
}

export const formatISODate = (date: Date): string | Date => {
  if (isDate(date))
    return formatISO(date, { representation: 'date' })
  else
    return date
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export interface HeadCell<T> {
  id: keyof T
  label: string
}

export interface UseOrder<T>{
  ():
    [
      order: Order,
      orderBy: keyof T,
      handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
    ]
}

