import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import {delItem} from "../../store/actions/items-editor";

interface DeleteButtonType {
  itemID: number
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('sellers')
  const {itemID, deletable} = props
  const deletePlaceAccess = useFetchAccess(delItem)
  const onClick = async () => {
    await deletePlaceAccess(itemID)
  }
  return (
    <GridActionsCellItem
      disabled={!deletable}
      icon={<DeleteIcon/>}
      label={d['delete']}
      onClick={onClick}
      color="inherit"
    />
  )
}

export default DeleteButton