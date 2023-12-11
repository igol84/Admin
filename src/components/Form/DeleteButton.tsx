import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, {useState} from "react";
import {useDictionaryTranslate} from "../../hooks/pages";
import DeleteDialog from "./Dialog";
import {IconButton} from "@mui/material";


interface DeleteButtonType {
  deletable: boolean
  onRemove: () => void
}

const DeleteButton = ({deletable, onRemove}: DeleteButtonType) => {
  const dict = useDictionaryTranslate('form')
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const onClick = () => {
    setDialogOpen(true)
  }
  const handleConfirm = () => {
    onRemove()
    setDialogOpen(false)
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