import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delExpense} from "../../store/actions/expenses";
import {Box, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  expenseID: number
  hidden?: boolean
  deletable?: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('form')
  const {expenseID, hidden = false, deletable = true} = props
  const deleteAccess = useFetchAccess(delExpense)
  const onClick = async () => {
    await deleteAccess(expenseID)
  }
  return (
    <Box hidden={hidden}>
      <IconButton aria-label={d['delete']} onClick={onClick} color="inherit" disabled={!deletable}>
        <DeleteIcon/>
      </IconButton>
    </Box>
  )
}

export default DeleteButton