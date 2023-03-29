import {GridActionsCellItem} from "@mui/x-data-grid";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {EditSimpleProduct} from "../../../../schemas/products-editor";
import {updateSimpleProduct} from "../../../../store/actions/products-editor";
import {useDictionaryTranslate, useFetchAccess} from "../../../../hooks/pages";

interface SaveButtonType {
  id: number
  name: string
  price: number
  resetFormData: () => void
  disabled?: boolean
}

const SaveButton = (props: SaveButtonType) => {
  const dict = useDictionaryTranslate('form')
  const {id, name, price, resetFormData, disabled = false} = props
  const editSimpleProduct = useFetchAccess(updateSimpleProduct)
  const onClick = async () => {
    const data: EditSimpleProduct = {id, new_name: name, new_price: price}
    await editSimpleProduct(data)
    resetFormData()
  }
  return (
    <GridActionsCellItem
      icon={<SaveRoundedIcon/>}
      label={dict('save')}
      onClick={onClick}
      color="inherit"
      disabled={disabled}
    />
  )
}

export default SaveButton