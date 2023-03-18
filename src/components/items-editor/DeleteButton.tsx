import {useDictionary} from "../../hooks/pages";
import {Box} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  itemID: number
  hidden: boolean
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('sellers')
  const {itemID, hidden, deletable} = props
  const onClick = async () => {
    console.log(itemID)
  }
  return (
    <Box hidden={hidden}>
      <GridActionsCellItem
        disabled={!deletable}
        icon={<DeleteIcon/>}
        label={d['delete']}
        onClick={onClick}
        color="inherit"
      />
    </Box>
  )
}

export default DeleteButton