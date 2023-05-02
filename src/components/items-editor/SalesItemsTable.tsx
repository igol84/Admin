import React from 'react';
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {useDictionaryTranslate} from "../../hooks/pages";
import {formatData, getComparator} from "../../hooks/form-data";
import {itemSale} from "../../schemas/items-editor";

interface SalesItemsTableType {
  itemSales: itemSale[]
}

const SalesItemsTable = (props: SalesItemsTableType) => {
  const dict = useDictionaryTranslate('itemsEditor')
  const {itemSales} = props
  return (
    <Box sx={{margin: 1, width: '100%'}}>
      <Typography variant="h6" gutterBottom component="div">
        Sales
      </Typography>
      <Table size="small" aria-label="purchases" sx={{margin: 1, width: '100%'}}>
        <TableHead>
          <TableRow>
            <TableCell>{dict('saleId')}</TableCell>
            <TableCell>{dict('quantity')}</TableCell>
            <TableCell>{dict('dateSale')}</TableCell>
            <TableCell>{dict('priceSell')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemSales.slice().sort(getComparator('asc', 'sale_id')).map((sale) => (
            <TableRow key={sale.sale_id}>
              <TableCell component="th" scope="row">{sale.sale_id}</TableCell>
              <TableCell>{sale.qty}</TableCell>
              <TableCell>{formatData(sale.date)}</TableCell>
              <TableCell>{sale.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default SalesItemsTable;