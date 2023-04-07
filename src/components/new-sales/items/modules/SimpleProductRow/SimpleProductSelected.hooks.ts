import {useEffect, useState} from "react";
import produce from "immer";
import {FieldNames, FormFields, ViewSimpleProduct} from "./types";



interface UseForm {
  (viewSimpleProduct: ViewSimpleProduct, resetFormData: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onQtyFieldChange: (qty: string) => void,
    onPriceFieldChange: (price: string) => void,
    onConfirm: () => void
  ]
}

export const useForm: UseForm = (viewSimpleProduct, resetFormData) => {

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

  const onConfirm =  () => {
      const saleData = {
        id: viewSimpleProduct.id,
        qty: formData.qty.value,
        price: Number(formData.price.value)
      }
      console.log(saleData)
      resetFormData()
  }

  return [formData, useError, onQtyFieldChange, onPriceFieldChange, onConfirm]
}