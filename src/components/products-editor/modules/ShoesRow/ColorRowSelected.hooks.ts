import {FieldNames, FormFields} from "./ColorRowSelected.types";
import {useState} from "react";
import produce from "immer";
import {useFetchAccess} from "../../../../hooks/pages";
import {updateColor} from "../../../../store/actions/products-editor";
import {EditColor} from "../../../../schemas/products-editor";

interface UseForm {
  (
    name: string,
    color: string,
    colorPrice: string,
    onSelectedColor: (value: string | null) => void
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

export const useForm: UseForm = (name, color, colorPrice, onSelectedColor) => {
  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    color: {value: color, error: ''},
    price: {value: colorPrice, error: ''},
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
    return formData.color.value !== color || formData.price.value !== colorPrice
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
      onSelectedColor(null)
    } else {
      onSelectedColor(null)
    }
  }
  const onClickClose = () => {
    onSelectedColor(null)
  }
  return [formData, useError, onColorFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm, onClickClose]
}