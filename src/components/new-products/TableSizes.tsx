import React, {Dispatch, SetStateAction} from 'react';
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
import SizesRange from "./TableSizesSizeRange";
import {RangeSizesType, SizeField} from "./AddNewProductForm";
import {SimpleField} from "../Form";

interface TableSizesType {
  rangeSizes: RangeSizesType
  setRangeSizes: Dispatch<SetStateAction<RangeSizesType>>
  dataSizes: SizeField[]
  onSizeFieldQtyChange: (field: {size: number, qty: string}) => void
  onSizeFieldLengthChange: (field: {size: number, length: string}) => void
}

const TableSizes = (props: TableSizesType) => {
  const {rangeSizes, setRangeSizes, dataSizes, onSizeFieldQtyChange, onSizeFieldLengthChange} = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const onQtyChange = (props: {size: number, qty: string }) => {
    const {size, qty} = props
    if(Number(qty))
      onSizeFieldQtyChange({size, qty: Number(qty).toString()})
  }
  const onLengthChange = (props: {size: number, length: string }) => {
    const {size, length} = props
    onSizeFieldLengthChange({size, length})
  }

  return (
    <Box minWidth='600px' sx={{border: `1px solid ${colors.primary[400]}`}}>
      <TableContainer sx={{maxHeight: '50vh',}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>
                <SizesRange rangeSizes={rangeSizes} setRangeSizes={setRangeSizes}/>
              </TableCell>
              <TableCell align="center" width='120px'>Count</TableCell>
              <TableCell align="center" width='120px'>Length</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSizes.map((field) => (
              <TableRow
                key={field.size}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                  '& td, & th': {p: 1}
                }}
              >
                <TableCell component="th" scope="row" align='right'>
                  {field.size}
                </TableCell>
                <TableCell align="right">
                  <SimpleField
                    type='number'
                    name={`qty-${field.size}`}
                    value={field.qty.toString()}
                    setValue={(value: string)=> onQtyChange({size: field.size, qty: value})}
                    focusText
                  />
                </TableCell>
                <TableCell align="right">
                  <SimpleField
                    type='number'
                    inputProps={{step: 0.5}}
                    name={`length-${field.size}`}
                    value={field.length.toString()}
                    setValue={(value: string)=> onLengthChange({size: field.size, length: value})}
                    focusText
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