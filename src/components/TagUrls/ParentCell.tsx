import {useAppSelector} from "../../hooks/redux";
import {GridColDef, GridRenderCellParams, useGridApiContext} from "@mui/x-data-grid";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import React from "react";
import {getParents} from "../../schemas/tagUrl";

const PlaceSelectEditInputCell = (props: GridRenderCellParams) => {
  const {id, value, field} = props;
  const {tagUrls} = useAppSelector(state => state.tagUrlsReducer)
  const parents = getParents(tagUrls)
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
      <MenuItem value=''>&nbsp;</MenuItem>
      {parents.map(parent => (
        <MenuItem key={parent} value={parent}>{parent}</MenuItem>
      ))}
    </Select>
  );
}

export const renderSelectEditInputTagUrlCell: GridColDef['renderCell'] = (params) => {
  return <PlaceSelectEditInputCell {...params}/>
}
