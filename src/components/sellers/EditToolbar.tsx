import {Box} from "@mui/material";
import AddNewSellerForm from "./AddNewSellerForm";
import React from "react";

function EditToolbar() {
  return (
    <Box sx={{my: 1}}>
      <AddNewSellerForm/>
    </Box>
  );
}

export default EditToolbar