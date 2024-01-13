import {useDictionary} from "../../hooks/pages";
import {Box, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React from "react";
import {useAppDispatch} from "../../hooks/redux";
import {createApi} from "../../ky";
import {delPlace} from "../../store/slices/placesSlice";

interface DeleteButtonType {
  placeId: number
  hidden: boolean
  deletable: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const {placeId, hidden, deletable} = props
  const d = useDictionary('places')
  const dispatch = useAppDispatch()
  const api = createApi()
  const deletePlaceAccess = async () => dispatch(delPlace({placeId, api}))
  const onClick = async () => {
    await deletePlaceAccess()
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