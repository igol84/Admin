import React, {useState} from "react";
import produce from "immer";
import {Field} from "../../../../../Form/types";
import {SelectedSize} from "./index";
import {useAppDispatch} from "../../../../../../hooks/redux";
import {putOnSale} from "../../../../../../store/actions/new-sales";
import {PutOnSale} from "../../../../../../schemas/new-sale";


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
    onKeyDown: (name: string, event: React.KeyboardEvent<HTMLDivElement>) => void,
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
  const onKeyDown = (name: string, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onConfirm()
    }
  }
  const dispatch = useAppDispatch()
  const onConfirm = () => {

    const saleData: PutOnSale = {
      productId: selectedSize.id,
      salePrice: Number(formShoesData.price.value),
      qty: 1
    }
    dispatch(putOnSale(saleData))
    onClose()
  }
  return [formShoesData, useError, onPriceFieldChange, onKeyDown, onConfirm]
}