import {FieldNames, FormFields} from "./AddNewProductFormTypes";
import {Dispatch, SetStateAction, useCallback} from "react";
import produce from "immer";
import {fieldPositive, fieldPositiveNotNull, fieldRequired} from "../Form";
import {NewProduct, ProductType} from "./newProduct";
import {useStoreId} from "../../hooks/redux";


export const useSubmit = () => {
  const storeId = useStoreId()

  const checkError = (field: FieldNames, error: string, setFormData: Dispatch<SetStateAction<FormFields>>) => {
    setFormData(produce(prevFormData => {
      prevFormData[field].error = error
    }))
    return error
  }

  const validateDate = useCallback((formData: FormFields, setFormData: Dispatch<SetStateAction<FormFields>>) => {
    let isValid = true
    if (checkError('name', fieldRequired(formData.name.value), setFormData)) {
      isValid = false
    }
    if (
      checkError('priceBuy', fieldRequired(formData.priceBuy.value), setFormData) ||
      checkError('priceBuy', fieldPositive(Number(formData.priceBuy.value)), setFormData)
    )
      isValid = false
    if (
      Number(formData.priceSell.value) > 0 &&
      checkError('priceSell', fieldPositive(Number(formData.priceSell.value)), setFormData)
    )
      isValid = false
    if (formData.productType.value === ProductType.product) {
      if (checkError('qty', fieldPositiveNotNull(Number(formData.qty.value)), setFormData))
        isValid = false
    }
    return isValid
  }, [])

  const getModuleData = (formData: FormFields) => {
    if (formData.productType.value === ProductType.shoes) {
      return {
        width: formData.width.value,
        color: formData.color.value,
        sizes: formData.sizes.filter(fieldSize => Number(fieldSize.qty) > 0).map((fieldSize) => {
          return {size: fieldSize.size, qty: Number(fieldSize.qty), length: Number(fieldSize.length)}
        })
      }
    } else return null
  }

  const createData = useCallback((formData: FormFields) => {
    if (storeId !== null) {
      const data: NewProduct = {
        store_id: storeId,
        type: formData.productType.value,
        name: formData.name.value,
        price_sell: Number(formData.priceSell.value),
        price_buy: Number(formData.priceBuy.value),
        qty: Number(formData.qty.value),
        module: getModuleData(formData)
      }
      return data
    }
    return null
  }, [storeId])
  return [validateDate, createData]
}





