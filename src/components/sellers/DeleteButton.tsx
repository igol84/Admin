import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delSeller} from "../../store/actions/sellers";
import {Box, IconButton} from "@mui/material";
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
      <IconButton aria-label={d['delete']} onClick={onClick} disabled={!deletable} color="inherit">
        <DeleteIcon/>
      </IconButton>
    </Box>
  )
}

export default DeleteButton