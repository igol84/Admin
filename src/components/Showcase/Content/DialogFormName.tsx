import React from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useDictionaryTranslate} from "../../../hooks/pages";

interface DialogFormNameProps {
  names: string[]
  selectedName: string
  onChangeName: (name: string) => void
  disabled: boolean
  error: boolean
}

const DialogFormName = ({names, selectedName, onChangeName, disabled, error}: DialogFormNameProps) => {
  const d = useDictionaryTranslate('showcase')
  return (
    <Autocomplete
      size='small' id="combo-box-demo" options={names} sx={{width: "100%"}} blurOnSelect
      disabled={disabled}
      onChange={(event, value) => onChangeName(value ? value : '')} value={selectedName}
      renderInput={(params) =>
        <TextField {...params} label={d('name')} color="secondary" error={error}/>
      }
    />
  );
};

export default DialogFormName;