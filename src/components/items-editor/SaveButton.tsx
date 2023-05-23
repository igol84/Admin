import {useDictionaryTranslate, useFetchAccess} from "../../hooks/pages";
import {GridActionsCellItem} from "@mui/x-data-grid";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {updateItem} from "../../store/actions/itemsEditor";
import {UpdatedItem} from "../../schemas/items-editor";

interface SaveButtonType {
  id: number
  qty: number
  price: number
  resetFormData: () => void
  disabled?: boolean
}

const SaveButton = (props: SaveButtonType) => {
  const dict = useDictionaryTranslate('form')
  const {id, qty, price, resetFormData, disabled = false} = props
  const editItem = useFetchAccess(updateItem)
  const onClick = async () => {
    const data: UpdatedItem = {id, new_qty: qty, new_price: price}
    await editItem(data)
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