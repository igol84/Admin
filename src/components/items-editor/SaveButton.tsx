import {useFetchAccess} from "../../hooks/pages";
import {GridActionsCellItem} from "@mui/x-data-grid";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import React from "react";
import {updateItem} from "../../store/actions/items-editor";
import {UpdatedItem} from "../../schemas/items-editor";

interface SaveButtonType {
  id: number
  qty: number
  price: number
  resetFormData: () => void
}

const SaveButton = (props: SaveButtonType) => {
  const {id, qty, price, resetFormData} = props
  const editItem = useFetchAccess(updateItem)
  const onClick = async () => {
    const data: UpdatedItem = {id, new_qty: qty, new_price: price}
    await editItem(data)
    resetFormData()
  }
  return (
    <GridActionsCellItem
      icon={<SaveRoundedIcon/>}
      label={'save'}
      onClick={onClick}
      color="inherit"
    />
  )
}

export default SaveButton