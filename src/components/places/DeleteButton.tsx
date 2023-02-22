import {useDictionary, useFetchAccess} from "../../hooks/pages";
import {delPlace} from "../../store/actions/places";
import {Box} from "@mui/material";
import {GridActionsCellItem} from "@mui/x-data-grid";
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