import {FieldNames, FormFields} from "./ColorRowSelected.types";
import {Dispatch, SetStateAction, useState} from "react";
import produce from "immer";
import {useFetchAccess} from "../../../../hooks/pages";
import {updateColor} from "../../../../store/actions/products-editor";
import {EditColor} from "../../../../schemas/products-editor";

interface UseForm {
  (
    name: string,
    color: string,
    priceWidth: string,
    setSelectedColor: Dispatch<SetStateAction<string | null>>
  ): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onColorFieldChange: (color: string) => void,
    onPriceFieldChange: (price: string) => void,
    disabledButtonSave: () => boolean,
    onConfirm: () => Promise<void>,
    onClickClose: () => void
  ]
}

export const useForm: UseForm = (name, color, priceWidth, setSelectedColor) => {
  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    color: {value: color, error: ''},
    price: {value: priceWidth, error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onColorFieldChange = (color: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.color.value = color
      prevFormData.color.error = ''
    }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const formWasEdited = () => {
    return formData.color.value !== color || formData.price.value !== priceWidth
  }
  const formHasNotErrors = () => {
    return !formData.price.error && !formData.color.error
  }

  const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())
  const editColor = useFetchAccess(updateColor)

  const onConfirm = async () => {
    if (formWasEdited() && formHasNotErrors()) {
      const price_for_sale = formData.price.value !== '' ? Number(formData.price.value) : null
      const updateData: EditColor = {
        name,
        color,
        new_color: formData.color.value,
        price_for_sale
      }
      await editColor(updateData)
      setSelectedColor(null)
    } else {
      setSelectedColor(null)
    }
  }
  const onClickClose = () => {
    setSelectedColor(null)
  }
  return [formData, useError, onColorFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm, onClickClose]
}