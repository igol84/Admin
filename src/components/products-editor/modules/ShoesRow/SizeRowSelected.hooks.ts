import {ViewSize} from "../../types";
import {SizeFieldNames, SizeFormFields} from "./SizeRowSelected.types";
import {useState} from "react";
import produce from "immer";
import {useFetchAccess} from "../../../../hooks/pages";
import {updateSize} from "../../../../store/actions/products-editor";
import {EditSize} from "../../../../schemas/products-editor";


interface UseSizeForm {
  (sizeData: ViewSize, onSelectedSize: (idSize: number | null) => void): [
    formSizeData: SizeFormFields,
    useError: (fieldName: SizeFieldNames) => string,
    onSizeFieldChange: (size: string) => void,
    onLengthFieldChange: (length: string) => void,
    onPriceFieldChange: (price: string) => void,
    disabledButtonSave: () => boolean,
    onConfirm: () => Promise<void>,
    onClickClose: () => void
  ]
}

export const useSizeForm: UseSizeForm = (sizeData, onSelectedSize) => {
  const initialFormFields: SizeFormFields = {
    size: {value: sizeData.size.toString(), error: ''},
    length: {value: sizeData.length.toString(), error: ''},
    price: {value: sizeData.price.toString(), error: ''},
  }
  const [formSizeData, setFormSizeData] = useState<SizeFormFields>(initialFormFields)
  const onSizeFieldChange = (size: string) => {
    if (Number(size) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.size.value = size
      }))
  }
  const onLengthFieldChange = (length: string) => {
    if (Number(length) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.length.value = length
      }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormSizeData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const formWasEdited = () => {
    return formSizeData.size.value !== sizeData.size.toString()
      || formSizeData.length.value !== sizeData.length.toString()
      || formSizeData.price.value !== sizeData.price.toString()
  }
  const formHasNotErrors = () => {
    return !formSizeData.price.error && !formSizeData.length.error && !formSizeData.price.error
  }

  const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())
  const useError = (fieldName: SizeFieldNames) => formSizeData[fieldName].error

  const editSize = useFetchAccess(updateSize)
  const onConfirm = async () => {
    if (formWasEdited() && formHasNotErrors()) {
      const updateData: EditSize = {
        id: sizeData.prod_id,
        size: Number(formSizeData.size.value),
        length: Number(formSizeData.length.value),
        price_for_sale: Number(formSizeData.price.value)
      }
      await editSize(updateData)
      onSelectedSize(null)
    } else {
      onSelectedSize(null)
    }
  }

  const onClickClose = () => {
    onSelectedSize(null)
  }
  return [formSizeData, useError, onSizeFieldChange, onLengthFieldChange, onPriceFieldChange, disabledButtonSave,
    onConfirm, onClickClose]
}