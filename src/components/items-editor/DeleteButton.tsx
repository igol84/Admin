import {useDictionary} from "../../hooks/pages";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  itemID: number
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('sellers')
  const {itemID, deletable} = props
  const onClick = async () => {
    console.log(itemID)
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