import React, {useCallback, useState} from "react";
import {FieldNames, FormFields, ItemForm} from "./types";
import {Order, UseOrder} from "../../hooks/form-data";
import produce from "immer";
import {useFetchAccess} from "../../hooks/pages";
import {fetchSalesByItem} from "../../store/actions/itemsEditor";


export const useOrder: UseOrder<ItemForm> = () => {
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

export interface UsePages {
  (countOfRows: number):
    [
      page: number,
      setPage: (value: number) => void,
      rowsPerPage: number,
      handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
      handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
      emptyRows: number
    ]
}

export const usePages: UsePages = (countOfRows) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0)
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - countOfRows) : 0

  return [page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows]
}


export interface UseForm {
  ():
    [
      formData: FormFields,
      isSelected: (id: number) => boolean,
      onQtyFieldChange: (qty: string) => void,
      onPriceFieldChange: (price: string) => void,
      resetFormData: () => void,
      useError: (fieldName: FieldNames) => string,
      handleClick: (event: React.MouseEvent<unknown>, id: number, qty: number, price: number) => Promise<void>,
      formWasEdited: (qty: number, price: number) => boolean
    ]
}

export const useForm: UseForm = () => {
  const fetchSalesByItemAccess = useFetchAccess(fetchSalesByItem)
  const isSelected = (id: number) => id === formData.id
  const initialFormFields: FormFields = {
    id: null,
    qty: {value: '', error: ''},
    price: {value: '', error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onQtyFieldChange = (qty: string) => {
    if (Number(qty) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.qty.value = Number(qty).toString()
      }))
  }

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }

  const resetFormData = () => {
    setFormData(initialFormFields)
  }
  const useError = (fieldName: FieldNames) => formData[fieldName].error

  const handleClick = async (event: React.MouseEvent<unknown>, id: number, qty: number, price: number) => {
    if (formData.id !== id) {
      await fetchSalesByItemAccess({itemId: id})
      setFormData(produce(prevFormData => {
        prevFormData.id = id
        prevFormData.qty.value = qty.toString()
        prevFormData.price.value = price.toString()
      }))
    }
  }


  const formWasEdited: (qty: number, price: number) => boolean = (qty, price) => {
    return qty !== Number(formData.qty.value) || price !== Number(formData.price.value)
  }

  return [formData, isSelected, onQtyFieldChange, onPriceFieldChange, resetFormData, useError, handleClick,
    formWasEdited]
}