import React, {Dispatch, SetStateAction} from 'react';
import {Box} from "@mui/material";

interface ColorRowProps {
  color: string
  width: string
  setSelectedColor: Dispatch<SetStateAction<string | null>>
}

const ColorRow = (props: ColorRowProps) => {
  const {color, width, setSelectedColor} = props
  const onClick = () => {
    setSelectedColor(color)
  }
  return (
    <Box className='color-field' onClick={onClick}>
      <Box sx={{width: "150px"}}>{color}</Box>
      <Box sx={{width: "150px"}}>{width}</Box>
      <Box sx={{flex: 1}}></Box>
    </Box>
  );
};

export default ColorRow;