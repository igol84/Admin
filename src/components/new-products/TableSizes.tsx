import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useTheme
} from "@mui/material";
import {tokens} from "../../theme";
import _ from "lodash";
import SizesRange from "./TableSizesSizeRange";
import {rangeSizesType} from "./AddNewProductForm";

interface SizeField {
  size: number
  qty?: number
  length?: number
}

interface TableSizesType{
  rangeSizes : rangeSizesType
  setRangeSizes: Dispatch<SetStateAction<rangeSizesType>>
}
const TableSizes = (props: TableSizesType) => {
  const {rangeSizes, setRangeSizes} = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const sizesArray = _.range(rangeSizes.from, rangeSizes.to + 1)
  const dataSizesForm: SizeField[]  = sizesArray.map(size=>(
    {size, qty: 0, length: 0}
  ))
  useEffect(() => {
    console.log(dataSizesForm)
  }, [])
  return (
    <Box minWidth='600px' sx={{border: `1px solid ${colors.primary[400]}`}}>
      <TableContainer sx={{maxHeight: '50vh',}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <SizesRange rangeSizes={rangeSizes} setRangeSizes={setRangeSizes}/>
              </TableCell>
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Length</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSizesForm.map((field) => (
              <TableRow
                key={field.size}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  '& td, & th': { p: 1}
                }}
              >
                <TableCell component="th" scope="row" align='right'>
                  {field.size}
                </TableCell>
                <TableCell align="right">
                  <TextField
                    sx={{width: '100px'}}
                    name={`qty-${field.size}`}
                    type='number'
                    color="secondary"
                    size="small"
                    value={field.qty}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    sx={{width: '100px'}}
                    name={`length-${field.size}`}
                    type='number'
                    color="secondary"
                    size="small"
                    value={field.length}
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableSizes;