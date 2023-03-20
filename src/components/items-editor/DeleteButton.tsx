import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, {useState} from "react";
import {delItem} from "../../store/actions/items-editor";
import DeleteDialog from "./Dialog";

interface DeleteButtonType {
  itemID: number
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('sellers')
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
      <GridActionsCellItem
        disabled={!deletable}
        icon={<DeleteIcon/>}
        label={d['delete']}
        onClick={onClick}
        color="inherit"
      />
      <DeleteDialog isOpen={dialogOpen} handleClose={() => setDialogOpen(false)} handleConfirm={handleConfirm}/>
    </>
  )
}

export default DeleteButton