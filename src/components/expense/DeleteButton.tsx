import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delExpense} from "../../store/actions/expenses";
import {Box} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  expenseID: number
  hidden: boolean
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('expenses')
  const {expenseID, hidden, deletable} = props
  const deleteExpenseAccess = useFetchAccess(delExpense)
  const onClick = async () => {
    await deleteExpenseAccess(expenseID)
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