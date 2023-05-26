import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, {useState} from "react";
import {useDictionaryTranslate} from "../../hooks/pages";
import DeleteDialog from "./Dialog";


interface DeleteButtonType {
  deletable: boolean
  onRemove: ()=> void
}

const DeleteButton = ({deletable, onRemove} : DeleteButtonType) => {
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
      <GridActionsCellItem
        disabled={!deletable}
        icon={<DeleteIcon/>}
        label={dict('delete')}
        onClick={onClick}
        color="inherit"
      />
      <DeleteDialog isOpen={dialogOpen} handleClose={() => setDialogOpen(false)} handleConfirm={handleConfirm}/>
    </>
  )
}

export default DeleteButton