import {FieldNames, FormFields} from "./NameRowSelected.types";
import {useState} from "react";
import {produce} from "immer";
import {useDictionaryTranslate, useFetchAccess} from "../../../../hooks/pages";
import {ViewShoes,} from "../../types";
import {updateShoes} from "../../../../store/actions/productsEditor";
import {EditShoes} from "../../../../schemas/products-editor";

interface UseForm {
  (
    viewShoes: ViewShoes,
    onSelectedNameForm: (flag: boolean) => void
  ): [
    formShoesData: FormFields,
    useError: (fieldName: FieldNames) => string,
    onNameFieldChange: (name: string) => void,
    onPriceFieldChange: (price: string) => void,
    disabledButtonSave: () => boolean,
    onConfirm: () => Promise<void>,
  ]
}

export const useForm: UseForm = (data, onSelectedNameForm) => {
  const dict = {'required': useDictionaryTranslate('form')('required')}
  const useError = (fieldName: FieldNames) => formShoesData[fieldName].error
  const prices: Set<number> = new Set()
  data.colors.map(color => {
    return color.widths.map(width => {
      return width.sizes.map(size => {
        prices.add(size.price)
      })
    })
  })

  const price = prices.size === 1 ? [...prices][0].toString() : ''
  const initialFormFields: FormFields = {
    name: {value: data.name, error: ''},
    price: {value: price, error: ''},
  }
  const [formShoesData, setFormShoesData] = useState<FormFields>(initialFormFields)
  const onNameFieldChange = (name: string) => {
    setFormShoesData(produce(prevFormData => {
      prevFormData.name.value = name
      prevFormData.name.error = ''
    }))
    if (name === '')
      setFormShoesData(produce(prevFormData => {
        prevFormData.name.error = dict['required']
      }))
  }
  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormShoesData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }
  const formWasEdited = () => {
    return formShoesData.name.value !== data.name || formShoesData.price.value !== price
  }
  const formHasNotErrors = () => {
    return !formShoesData.price.error && !formShoesData.name.error
  }

  const disabledButtonSave = () => !(formWasEdited() && formHasNotErrors())
  const editShoes = useFetchAccess(updateShoes)

  const onConfirm = async () => {
    if (formWasEdited() && formHasNotErrors()) {
      const price_for_sale = formShoesData.price.value !== '' ? Number(formShoesData.price.value) : null
      const updateData: EditShoes = {
        name: data.name,
        new_name: formShoesData.name.value,
        price_for_sale
      }
      await editShoes(updateData)
      onSelectedNameForm(false)
    } else {
      onSelectedNameForm(false)
    }
  }
  return [formShoesData, useError, onNameFieldChange, onPriceFieldChange, disabledButtonSave, onConfirm]
}