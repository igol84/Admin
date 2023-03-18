import React, {useCallback} from "react";
import {ItemForm} from "./types";
import {Order, UseOrder} from "../../hooks/form-data";



export const useOrder: UseOrder<ItemForm> = ()=>{
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof ItemForm>('id');

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof ItemForm) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    }, [order, orderBy])

  return [order, orderBy, handleRequestSort]
}

export interface UsePages{
  (countOfRows: number):
    [
      page: number,
      rowsPerPage: number,
      handleChangePage: (event:  React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
      handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
      emptyRows: number
    ]
}
export const usePages: UsePages = (countOfRows) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event:  React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countOfRows) : 0

  return [page,  rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows]
}