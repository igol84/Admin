import React from 'react';
import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {Sale} from "../../schemas/items-editor";
import {useDictionaryTranslate} from "../../hooks/pages";
import {formatData, getComparator} from "../../hooks/form-data";

interface SalesItemsTableType {
  isItemSelected: boolean
  itemSales: Sale[]
}

const SalesItemsTable = (props: SalesItemsTableType) => {
  const dict = useDictionaryTranslate('itemsEditor')
  const {isItemSelected, itemSales} = props
  return (
    <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
      <Collapse in={isItemSelected} timeout="auto" unmountOnExit>
        <Box sx={{margin: 1}}>
          <Typography variant="h6" gutterBottom component="div">
            Sales
          </Typography>
          <Table size="small" aria-label="purchases">
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
      </Collapse>
    </TableCell>
  );
};

export default SalesItemsTable;