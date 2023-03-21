import React from 'react';
import {Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {Sale} from "../../schemas/items-editor";

interface SalesItemsTableType {
  isItemSelected: boolean
  itemSales: Sale[]
}

const SalesItemsTable = (props: SalesItemsTableType) => {
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
                <TableCell>Sale Id</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price sell</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemSales.map((sale) => (
                <TableRow key={sale.sale_id}>
                  <TableCell component="th" scope="row">{sale.sale_id}</TableCell>
                  <TableCell>{sale.qty}</TableCell>
                  <TableCell>{sale.date}</TableCell>
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