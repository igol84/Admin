import {useDictionaryTranslate, useFetchAccess} from "../../hooks/pages";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, {useState} from "react";
import {delItem} from "../../store/actions/itemsEditor";
import DeleteDialog from "../Form/Dialog";
import {IconButton} from "@mui/material";

interface DeleteButtonType {
  itemID: number
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const dict = useDictionaryTranslate('form')
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const {itemID, deletable} = props
  const deletePlaceAccess = useFetchAccess(delItem)
  const onClick = () => {
    setDialogOpen(true)
  }
  const handleConfirm = async () => {
    await deletePlaceAccess(itemID)
  }
  return (
    <>
      <IconButton aria-label={dict('delete')} onClick={onClick} color="inherit" disabled={!deletable}>
        <DeleteIcon/>
      </IconButton>
      <DeleteDialog isOpen={dialogOpen} handleClose={() => setDialogOpen(false)} handleConfirm={handleConfirm}/>
    </>
  )
}

export default DeleteButton