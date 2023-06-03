import React from 'react';
import {MenuItem} from "@mui/material";
import {SimpleSelect} from "../../Form";

interface DialogFormColorsProps {
  colors: string[]
  selectedColor: string
  onChangeColor: (color: string) => void
  disabled: boolean
  error: string
}

const DialogFormColors = ({colors, selectedColor, onChangeColor, disabled, error}: DialogFormColorsProps) => {

  return (
    <SimpleSelect name='colors' label='colors' value={selectedColor} disabled={disabled}
                  setValue={onChangeColor} error={error}>
      <MenuItem value='' ></MenuItem>
      {colors.map((color) => (
        <MenuItem key={color} value={color} >{color}</MenuItem>
      ))}
    </SimpleSelect>
  );
};

export default DialogFormColors;