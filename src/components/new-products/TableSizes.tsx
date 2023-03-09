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

interface TableSizesType {
  rangeSizes: RangeSizesType
  setRangeSizes: Dispatch<SetStateAction<RangeSizesType>>
  dataSizes: SizeField[]
  onSizeFieldQtyChange: (field: Pick<SizeField, 'size' | 'qty'>) => void
  onSizeFieldLengthChange: (field: Pick<SizeField, 'size' | 'length'>) => void
}

const TableSizes = (props: TableSizesType) => {
  const {rangeSizes, setRangeSizes, dataSizes, onSizeFieldQtyChange, onSizeFieldLengthChange} = props
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const onQtyChange = (props: Pick<SizeField, 'size' | 'qty'>) => {
    const {size, qty} = props
    if (qty !== undefined && qty >= 0 && qty < 10000)
      onSizeFieldQtyChange({size, qty})
  }
  const onLengthChange = (props: { size: number, length: string }) => {
    const {size, length} = props
    console.log(length)
    const NumberLength = Number(length)
    if (length !== undefined && NumberLength >= 0 && NumberLength < 80)
      onSizeFieldLengthChange({size, length: NumberLength})
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
              <TableCell align="center">Count</TableCell>
              <TableCell align="center">Length</TableCell>
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
                  <TextField
                    sx={{width: '100px'}}
                    name={`qty-${field.size}`}
                    type='number'
                    color="secondary"
                    size="small"
                    value={field.qty}
                    onFocus={(event) => event.target.select()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onQtyChange({size: field.size, qty: Number(event.target.value)})
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    inputProps={{step: 0.5, inputMode: 'numeric', pattern: '[0-9]*' }}
                    sx={{width: '100px'}}
                    name={`length-${field.size}`}
                    type='number'
                    color="secondary"
                    size="small"
                    value={field.length}
                    onFocus={(event) => event.target.select()}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onLengthChange({size: field.size, length: event.target.value})
                    }}
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