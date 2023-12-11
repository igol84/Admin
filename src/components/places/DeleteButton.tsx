import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delPlace} from "../../store/actions/places";
import {Box, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";

interface DeleteButtonType {
  placeID: number
  hidden: boolean
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const d = useDictionary('places')
  const {placeID, hidden, deletable} = props
  const deletePlaceAccess = useFetchAccess(delPlace)
  const onClick = async () => {
    await deletePlaceAccess(placeID)
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