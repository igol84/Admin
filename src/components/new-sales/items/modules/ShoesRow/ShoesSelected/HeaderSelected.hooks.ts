import {useState} from "react";
import produce from "immer";
import {Field} from "../../../../../Form/types";
import {SelectedSize} from "./index";

interface FormFields {
  price: Field<string>
}

type FieldNames = keyof FormFields

interface UseForm {
  (
    selectedSize: SelectedSize,
    onClose: () => void
  ): [
    formShoesData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onPriceFieldChange: (price: string) => void,
    onConfirm: () => Promise<void> | void,
  ]
}

export const useForm: UseForm = (selectedSize, onClose) => {
  const useError = (fieldName: FieldNames) => formShoesData[fieldName].error
  const initialFormFields: FormFields = {
    price: {value: selectedSize.price.toString(), error: ''},
  }
  const [formShoesData, setFormShoesData] = useState<FormFields>(initialFormFields)

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormShoesData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }


  const onConfirm = () => {
    const saleData = {
      id: selectedSize.id,
      price: formShoesData.price.value
    }
    console.log(saleData)
    onClose()
  }
  return [formShoesData, useError, onPriceFieldChange, onConfirm]
}