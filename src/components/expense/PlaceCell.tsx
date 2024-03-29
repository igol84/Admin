import {useAppSelector} from "../../hooks/redux";
import {GridColDef, GridRenderCellParams, useGridApiContext} from "@mui/x-data-grid";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";

interface TextCellProps {
  placeId: number
}

const PlaceTextCell = (props: TextCellProps) => {
  const {placeId} = props
  const {places} = useAppSelector(state => state.expensesReducer)
  const selectedPlace = places.find(place => place.id === Number(placeId))
  const selectedPlaceName = selectedPlace ? selectedPlace.name : 'wrong id'
  return (
    <>
      {selectedPlaceName}
    </>
  )
}

const PlaceSelectEditInputCell = (props: GridRenderCellParams) => {
  const {id, value, field} = props;
  const {places} = useAppSelector(state => state.expensesReducer)
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({id, field, value: event.target.value});
    apiRef.current.stopCellEditMode({id, field});
  };

  return (
    <Select
      color='secondary'
      value={value}
      onChange={handleChange}
      size="small"
      sx={{width: '100%'}}
      autoFocus
    >
      {places.map(place => (
        <MenuItem key={place.id} value={place.id}>{place.name}</MenuItem>
      ))}
    </Select>
  );
}

export const renderSelectEditInputPlaceCell: GridColDef['renderCell'] = (params) => {
  return <PlaceSelectEditInputCell {...params}/>
}

export const renderCellPlace: GridColDef['renderCell'] = (params) => {
  return <PlaceTextCell placeId={params.row.place_id}/>
}