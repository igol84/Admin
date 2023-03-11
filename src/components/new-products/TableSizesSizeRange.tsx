import React, {Dispatch, SetStateAction} from "react";
import {Box, TextField} from "@mui/material";
import {RangeSizesType} from "./AddNewProductFormTypes";



interface SizesRangeProps {
  rangeSizes: RangeSizesType
  setRangeSizes: Dispatch<SetStateAction<RangeSizesType>>
}

const MIN_SIZE = 1
const MAX_SIZE = 56


const SizesRange = (props: SizesRangeProps) => {
  const {rangeSizes, setRangeSizes} = props

  const onChange = (value: number, field: 'from' | 'to') => {
    if (value >= MIN_SIZE && value <= MAX_SIZE)
      setRangeSizes(prefRangeSizes => {
          return {...prefRangeSizes, [field]: value}
        }
      )
  }

  return (

    <Box display='flex' gap={1} alignItems='center'>
      Sizes range:
      <TextField
        sx={{width: '80px'}}
        type='number'
        label='from size'
        color="secondary"
        size="small"
        value={rangeSizes.from}
        onFocus={(event) => event.target.select()}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(Number(event.target.value), "from")
        }}
      />

      <TextField
        sx={{width: '80px'}}
        type='number'
        label='to size'
        color="secondary"
        size="small"
        value={rangeSizes.to}
        onFocus={(event) => event.target.select()}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(Number(event.target.value), "to")
        }}
      />
    </Box>
  );
};

export default SizesRange