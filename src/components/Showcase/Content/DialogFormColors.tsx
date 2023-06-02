import React from 'react';
import {MenuItem} from "@mui/material";
import {SimpleSelect} from "../../Form";

interface DialogFormColorsProps {
  colors: string[]
  selectedColor: string
  onChangeColor: (color: string) => void
  disabled: boolean
}

const DialogFormColors = ({colors, selectedColor, onChangeColor, disabled}: DialogFormColorsProps) => {
  const isOne = colors.length === 1
  const selected = isOne ? colors[0] : selectedColor
  return (
    <SimpleSelect name='colors' label='colors' value={selected ? selected : colors[0]} disabled={disabled || isOne}
                  setValue={onChangeColor}>
      {colors.map((color) => (
        <MenuItem key={color} value={color} >{color}</MenuItem>
      ))}
    </SimpleSelect>
  );
};

export default DialogFormColors;