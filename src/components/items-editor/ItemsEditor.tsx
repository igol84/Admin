import React from 'react'
import {Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@mui/material"
import {useLoaderAccess} from "../../hooks/pages"

import {useAppSelector, useStoreId} from "../../hooks/redux"
import {fetchItemsEditor} from "../../store/actions/items-editor"
import {useBoxTableStyle} from "../Form/style"
import {ItemForm} from "./types"
import {useOrder, usePages} from "./hooks";
import EnhancedTableHead from "./EnhancedTableHead";
import {getComparator, HeadCell} from "../../hooks/form-data";
import DeleteButton from "./DeleteButton";


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
  const boxTableStyle = useBoxTableStyle()
  const {itemsEditor} = useAppSelector(state => state.itemsEditorSlice)
  const rows = itemsEditor

  const [order, orderBy, handleRequestSort] = useOrder()
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows] = usePages(rows.length)


  const [selected, setSelected] = React.useState<number | null>(null);
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    setSelected(id);
  };
  const isSelected = (id: number) => id === selected;



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
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>{row.buy_price}</TableCell>
                    <TableCell>{row.date_buy}</TableCell>
                    <TableCell sx={{p: 0}}><DeleteButton hidden={!isItemSelected} deletable={true} itemID={row.id}/></TableCell>
                  </TableRow>
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
    </Box>
  );
}

export default ItemsEdit
