import {useDictionaryTranslate, useFetchAccess} from "../../hooks/pages";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {updateItem} from "../../store/actions/itemsEditor";
import {UpdatedItem} from "../../schemas/items-editor";
import {IconButton} from "@mui/material";

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
    <IconButton aria-label={dict('save')} onClick={onClick} color="inherit" disabled={disabled}>
      <SaveRoundedIcon/>
    </IconButton>
  )
}

export default SaveButton