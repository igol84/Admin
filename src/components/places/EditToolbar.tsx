import {Box} from "@mui/material";
import AddNewPlaceForm from "./AddNewPlaceForm";
import React from "react";

function EditToolbar() {
  return (
    <Box sx={{my: 1}}>
      <AddNewPlaceForm/>
    </Box>
  );
}

export default EditToolbar