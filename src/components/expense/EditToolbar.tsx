import {Box} from "@mui/material";
import AddNewExpenseForm from "./AddNewExpenseForm";
import React from "react";

function EditToolbar() {
  return (
    <Box sx={{my: 1}}>
      <AddNewExpenseForm/>
    </Box>
  );
}

export default EditToolbar