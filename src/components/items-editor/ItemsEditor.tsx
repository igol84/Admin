import React from 'react'
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material"
import {useFetchAccess, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages"

import {useAppSelector, useStoreId} from "../../hooks/redux"
import {fetchItemsEditor, fetchSalesByItem} from "../../store/actions/items-editor"
import {useBoxTableStyle} from "../Form/style"
import {ItemForm} from "./types"
import {useOrder, usePages} from "./hooks";
import EnhancedTableHead from "./EnhancedTableHead";
import {getComparator, HeadCell} from "../../hooks/form-data";
import DeleteButton from "./DeleteButton";
import LoadingCircular from "../LoadingCircular";


const headCells: readonly HeadCell<ItemForm>[] = [
  {id: 'id', label: 'Item Id'},
  {id: 'name', label: 'Name'},
  {id: 'qty', label: 'Quantity'},
  {id: 'buy_price', label: 'Buy price'},
  {id: 'date_buy', label: 'Date buy'},
];


const ItemsEdit = () => {
  const storeId = useStoreId()
  useLoaderAccess(fetchItemsEditor, {storeId})
  const fetchSalesByItemAccess = useFetchAccess(fetchSalesByItem)
  const boxTableStyle = useBoxTableStyle()
  const {itemsEditor, isLoading, itemSales} = useAppSelector(state => state.itemsEditorSlice)
  const showLoading = useIsLoadingDisplay(isLoading)
  const rows = itemsEditor

  const [order, orderBy, handleRequestSort] = useOrder()
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows] = usePages(rows.length)


  const [selected, setSelected] = React.useState<number | null>(null);
  const handleClick = async (event: React.MouseEvent<unknown>, id: number) => {
    if (selected !== id) {
      await fetchSalesByItemAccess({itemId: id})
      setSelected(id)
    } else
      setSelected(null)
  };
  const isSelected = (id: number) => id === selected;
  const isDeletable = !(!!itemSales.length)


  return (
    <Box sx={boxTableStyle}>
      <TableContainer sx={{maxHeight: '70vh',}}>
        <Table
          sx={{minWidth: 750}}
          aria-label="sticky table"
          stickyHeader
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {rows.slice().sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id)
                const isItemWithSales = !!itemSales.length
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.qty}</TableCell>
                      <TableCell>{row.buy_price}</TableCell>
                      <TableCell>{row.date_buy}</TableCell>
                      <TableCell sx={{p: 0}}>
                        {isItemSelected && <DeleteButton deletable={isDeletable} itemID={row.id}/>}
                      </TableCell>
                    </TableRow>
                    {isItemSelected && isItemWithSales &&
                       <TableRow key={row.id}>
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
                                            <TableCell align="right">Date</TableCell>
                                            <TableCell align="right">Price sell</TableCell>
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
                       </TableRow>
                    }
                  </React.Fragment>
                );
              })}
            {emptyRows > 0 && (
              <TableRow sx={{
                height: 56 * emptyRows,
              }}>
                <TableCell colSpan={6}/>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <LoadingCircular show={showLoading}/>
    </Box>
  );
}

export default ItemsEdit
