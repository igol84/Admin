import {useState} from "react";
import produce from "immer";
import {ViewNewSaleLineItem} from "../types";
import {FieldNames, FormFields} from "./NewSaleLineItemRowSelected.types";
import {useAppDispatch} from "../../../../hooks/redux";
import {RemovedNewSaleItem, UpdatedNewSaleItem} from "../../../../schemas/new-sale";
import {removeNewSaleItem, updateNewSaleItem} from "../../../../store/actions/new-sales";


interface UseForm {
  (viewNewSaleLineItem: ViewNewSaleLineItem, resetSelectedRow: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onPriceFieldChange: (price: string) => void,
    onConfirm: () => void,
    onRemove: () => void
  ]
}

export const useForm: UseForm = (viewNewSaleLineItem, resetSelectedRow) => {

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    price: {value: viewNewSaleLineItem.price.toString(), error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const dispatch = useAppDispatch()
  const onConfirm = () => {
    const updatedNewSaleItem: UpdatedNewSaleItem = {
      prodId: viewNewSaleLineItem.prod_id,
      qty: viewNewSaleLineItem.qty,
      newPrice: Number(formData.price.value)
    }
    dispatch(updateNewSaleItem(updatedNewSaleItem))
    resetSelectedRow()
  }

  const onRemove = () => {
    const removedNewSaleItem: RemovedNewSaleItem = {
      prodId: viewNewSaleLineItem.prod_id,
      price: viewNewSaleLineItem.price
    }
    dispatch(removeNewSaleItem(removedNewSaleItem))
    resetSelectedRow()
  }

  return [formData, useError, onPriceFieldChange, onConfirm, onRemove]
}