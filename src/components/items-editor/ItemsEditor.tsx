import React from 'react'
import {Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@mui/material"
import {useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages"

import {useAppSelector, useStoreId} from "../../hooks/redux"
import {fetchItemsEditor} from "../../store/actions/items-editor"
import {useBoxTableStyle} from "../Form/style"
import {ItemForm} from "./types"
import {useForm, useOrder, usePages} from "./hooks";
import EnhancedTableHead from "./EnhancedTableHead";
import {getComparator, HeadCell} from "../../hooks/form-data";
import DeleteButton from "./DeleteButton";
import LoadingCircular from "../LoadingCircular";
import {SimpleField} from "../Form";
import SaveButton from "./SaveButton";
import CloseIcon from "@mui/icons-material/Close";
import {GridActionsCellItem} from "@mui/x-data-grid";
import SalesItemsTable from "./SalesItemsTable";


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
  const {itemsEditor, isLoading, itemSales} = useAppSelector(state => state.itemsEditorSlice)
  const rows = itemsEditor
  const isItemWithSales = !!itemSales.length

  const showLoading = useIsLoadingDisplay(isLoading)
  const [order, orderBy, handleRequestSort] = useOrder()
  const [page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows] = usePages(rows.length)
  const [
    formData, isSelected, onQtyFieldChange, onPriceFieldChange, resetFormData, useError, handleClick, formWasEdited
  ] = useForm()

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
                const qtyContent = isItemSelected ?
                  <SimpleField
                    type='number'
                    name='qty'
                    label={'qty'}
                    value={formData.qty.value.toString()}
                    setValue={onQtyFieldChange}
                    error={useError('qty')}
                    focusText
                    fullWidth={false}
                  /> : row.qty
                const priceContent = isItemSelected ?
                  <SimpleField
                    type='number'
                    name='price'
                    label={'price'}
                    value={formData.price.value.toString()}
                    setValue={onPriceFieldChange}
                    error={useError('price')}
                    focusText
                    fullWidth={false}
                  /> : row.buy_price

                const buttons = isItemSelected &&
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <SaveButton
                      disabled={!formWasEdited(row.qty, row.buy_price)}
                      id={row.id}
                      qty={Number(formData.qty.value)}
                      price={Number(formData.price.value)}
                      resetFormData={resetFormData}
                    />
                    <DeleteButton deletable={!isItemWithSales} itemID={row.id}/>
                    <GridActionsCellItem
                      icon={<CloseIcon/>}
                      label={'close'}
                      onClick={resetFormData}
                      color="inherit"
                    />
                  </Box>

                const salesRow = isItemSelected && isItemWithSales &&
                   <TableRow>
                      <SalesItemsTable isItemSelected={isItemSelected} itemSales={itemSales}/>
                   </TableRow>


                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id, row.qty, row.buy_price)}
                      role="checkbox"
                      selected={isItemSelected}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{qtyContent}</TableCell>
                      <TableCell>{priceContent}</TableCell>
                      <TableCell>{row.date_buy}</TableCell>
                      <TableCell>{buttons}</TableCell>
                    </TableRow>
                    {salesRow}
                  </React.Fragment>
                )
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
  )
}

export default ItemsEdit
