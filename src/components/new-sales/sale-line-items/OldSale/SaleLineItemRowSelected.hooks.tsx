import {useState} from "react";
import produce from "immer";
import {FieldNames, FormFields} from "./SaleLineItemRowSelected.types";
import {ViewSaleLineItem} from "../types";


interface UseForm {
  (viewSaleLineItem: ViewSaleLineItem, resetSelectedRow: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onPriceFieldChange: (price: string) => void,
    onConfirm: () => void,
    onRemove: () => void
  ]
}

export const useForm: UseForm = (viewSaleLineItem, resetSelectedRow) => {

  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    price: {value: viewSaleLineItem.salePrice.toString(), error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  // const dispatchEditSLIPrice = useFetchAccess(editSLIPrice)
  // const onConfirm = async () => {
  //   const updatedNewSaleItem: EditSLIPrice = {
  //     old_sli: {
  //       sale_id: viewSaleLineItem.saleId,
  //       item_id: viewSaleLineItem.itemId,
  //       sale_price: viewSaleLineItem.salePrice,
  //       qty: viewSaleLineItem.qty
  //     },
  //     new_sli: {
  //       sale_id: viewSaleLineItem.saleId,
  //       item_id: viewSaleLineItem.itemId,
  //       sale_price: Number(formData.price.value),
  //       qty: viewSaleLineItem.qty
  //     }
  //   }
  //   await dispatchEditSLIPrice(updatedNewSaleItem)
  //   resetSelectedRow()
  // }
  const onConfirm = () => null
  const onRemove = () => null

  return [formData, useError, onPriceFieldChange, onConfirm, onRemove]
}