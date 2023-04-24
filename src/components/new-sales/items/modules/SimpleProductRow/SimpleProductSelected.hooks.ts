import React, {useState} from "react";
import produce from "immer";
import {FieldNames, FormFields, ViewSimpleProduct} from "./types";
import {PutOnSale} from "../../../../../schemas/new-sale";
import {putOnSale} from "../../../../../store/actions/new-sales";
import {useAppDispatch} from "../../../../../hooks/redux";


interface UseForm {
  (viewSimpleProduct: ViewSimpleProduct, resetSelectedRow: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onQtyFieldChange: (qty: string) => void,
    onPriceFieldChange: (price: string) => void,
    onKeyDown: (name: string, event: React.KeyboardEvent<HTMLDivElement>) => void,
    onConfirm: () => void
  ]
}

export const useForm: UseForm = (viewSimpleProduct, resetSelectedRow) => {

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    qty: {value: '1', error: ''},
    price: {value: viewSimpleProduct.price.toString(), error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)
  const onQtyFieldChange = (qty: string) => {
    if (Number(qty) >= 0 && Number(qty) <= viewSimpleProduct.qty)
      setFormData(produce(prevFormData => {
        prevFormData.qty.value = qty
      }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const onKeyDown = (name: string, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onConfirm()
    }
  }
  const dispatch = useAppDispatch()
  const onConfirm = () => {
    const saleData: PutOnSale = {
      productId: viewSimpleProduct.id,
      salePrice: Number(formData.price.value),
      qty: Number(formData.qty.value)
    }
    dispatch(putOnSale(saleData))
    resetSelectedRow()
  }

  return [formData, useError, onQtyFieldChange, onPriceFieldChange, onKeyDown, onConfirm]
}