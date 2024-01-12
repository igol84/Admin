import {FieldNames, FormFields} from "./types";
import {useEffect, useState} from "react";
import {produce} from "immer";
import {ViewSimpleProduct} from "../../types";
import {useFetchAccess} from "../../../../hooks/pages";
import {updateSimpleProduct} from "../../../../store/actions/productsEditor";
import {EditSimpleProduct} from "../../../../schemas/products-editor";

interface UseForm {
  (data: ViewSimpleProduct, resetFormData: () => void): [
    formData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onNameFieldChange: (name: string) => void,
    onPriceFieldChange: (price: string) => void,
    disabledButtonSave: () => boolean,
    onConfirm: () => Promise<void>
  ]
}

export const useForm: UseForm = (data, resetFormData) => {
  const escFunction = async (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      resetFormData()
    }
    if (event.key === "Enter") {
      await onConfirm()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false)
    return () => {
      document.removeEventListener("keydown", escFunction, false)
    }
  })
  const useError = (fieldName: FieldNames) => formData[fieldName].error
  const initialFormFields: FormFields = {
    id: null,
    name: {value: data.name, error: ''},
    price: {value: data.price.toString(), error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)
  const onNameFieldChange = (name: string) => {
    setFormData(produce(prevFormData => {
      prevFormData.name.value = name
      prevFormData.name.error = ''
    }))
    if (name === '')
      setFormData(produce(prevFormData => {
        prevFormData.name.error = 'required'
      }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const formWasEdited = () => {
    return data.name !== formData.name.value || data.price !== Number(formData.price.value)
  }
  const formHasNotErrors = () => {
    return !formData.price.error && !formData.name.error
  }

  const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())

  const editSimpleProduct = useFetchAccess(updateSimpleProduct)
  const onConfirm = async () => {
    if (formWasEdited() && formHasNotErrors()) {
      const updateData: EditSimpleProduct = {
        id: data.id,
        new_name: formData.name.value,
        new_price: Number(formData.price.value)
      }
      await editSimpleProduct(updateData)
      resetFormData()
    } else {
      resetFormData()
    }
  }

  return [formData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm]
}