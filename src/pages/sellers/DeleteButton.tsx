import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delSeller} from "../../store/actions/sellers";
import {Box} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  sellerID: number
  hidden: boolean
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('sellers')
  const {sellerID, hidden, deletable} = props
  const deleteSellerAccess = useFetchAccess(delSeller)
  const onClick = async () => {
    await deleteSellerAccess(sellerID)
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