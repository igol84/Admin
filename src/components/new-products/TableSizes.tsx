import React from 'react';
import {Box, Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import {SimpleField} from "../Form";
import {OnConcreteFieldChange, SizeField} from "./AddNewProductFormTypes";
import {useBoxTableStyle} from "../Form/style";


interface TableSizesType {
  dataSizes: SizeField[]
  onSizeFieldQtyChange: OnConcreteFieldChange
  onSizeFieldLengthChange: OnConcreteFieldChange
}

const TableSizes = (props: TableSizesType) => {
  const {dataSizes, onSizeFieldQtyChange, onSizeFieldLengthChange} = props
  const boxTableStyle = useBoxTableStyle()

  const onQtyChange = (props: { size: number, qty: string }) => {
    const {size, qty} = props
    if (Number(qty) >= 0)
      onSizeFieldQtyChange({size, value: Number(qty).toString()})
  }
  const onLengthChange = (props: { size: number, length: string }) => {
    const {size, length} = props
    if (Number(length) >= 0)
      onSizeFieldLengthChange({size, value: length})
  }

  return (
    <Box sx={boxTableStyle}>
      <TableContainer sx={{maxHeight: '50vh',}}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row" align='right' colSpan={4}>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px 2px', flexWrap: 'wrap'}}>
                  {dataSizes.map((field) => (
                    <Box
                      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', width: 75}}
                      key={field.size}
                    >
                      {field.size}

                      <SimpleField
                        type='number'
                        name={`qty-${field.size}`}
                        value={field.qty.toString()}
                        setValue={(value: string) => onQtyChange({size: field.size, qty: value})}
                        focusText
                      />

                      <SimpleField
                        type='number'
                        inputProps={{step: 0.5}}
                        name={`length-${field.size}`}
                        value={field.length.toString()}
                        setValue={(value: string) => onLengthChange({size: field.size, length: value})}
                        focusText
                        disabled={field.disable}
                      />
                    </Box>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableSizes;