import React, {useState} from 'react'
import {Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow} from "@mui/material"
import {useDictionaryTranslate, useIsLoadingDisplay, useLoaderAccess} from "../../hooks/pages"
import {AnimatePresence, motion} from "framer-motion"
import {useAppSelector, useStoreId} from "../../hooks/redux"
import {fetchItemsEditor} from "../../store/actions/items-editor"
import {useBoxTableStyle} from "../Form/style"
import {ItemForm} from "./types"
import {useForm, useOrder, usePages} from "./hooks";
import EnhancedTableHead from "./EnhancedTableHead";
import {formatData, getComparator, HeadCell} from "../../hooks/form-data";
import DeleteButton from "./DeleteButton";
import LoadingCircular from "../LoadingCircular";
import {SimpleField} from "../Form";
import SaveButton from "./SaveButton";
import CloseIcon from "@mui/icons-material/Close";
import {GridActionsCellItem} from "@mui/x-data-grid";
import SalesItemsTable from "./SalesItemsTable";

const ItemsEdit = () => {

  const storeId = useStoreId()
  useLoaderAccess(fetchItemsEditor, {storeId})

  const boxTableStyle = useBoxTableStyle()
  const {itemsEditor, isLoading, itemSales} = useAppSelector(state => state.itemsEditorSlice)
  const rows = itemsEditor
  const isItemWithSales = !!itemSales.length

  const dict = useDictionaryTranslate('itemsEditor')

  const headCells: readonly HeadCell<ItemForm>[] = [
    {id: 'id', label: dict('temId')},
    {id: 'name', label: dict('name')},
    {id: 'qty', label: dict('quantity')},
    {id: 'buy_price', label: dict('buyPrice')},
    {id: 'date_buy', label: dict('dateBuy')},
  ];

  const [search, setSearch] = useState<string>('')
  const searchRowsByName = (row: ItemForm) => row.name.toUpperCase().includes(search.toUpperCase())
  const filteredRows = rows.slice().filter(searchRowsByName)
  const countOfRows = filteredRows.length

  const showLoading = useIsLoadingDisplay(isLoading)
  const [order, orderBy, handleRequestSort] = useOrder()

  const [page, setPage, rowsPerPage, handleChangePage, handleChangeRowsPerPage, emptyRows] = usePages(countOfRows)
  const [
    formData, isSelected, onQtyFieldChange, onPriceFieldChange, resetFormData, useError, handleClick, formWasEdited
  ] = useForm()

  const onSetSearch = (value: string) => {
    setSearch(value)
    setPage(0)
  }

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
            search={search}
            setSearch={onSetSearch}
          />
          <TableBody>
            {rows.slice().filter(searchRowsByName)
              .sort(getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id)
                const qtyContent = isItemSelected ?
                  <SimpleField
                    type='number'
                    name='qty'
                    value={formData.qty.value.toString()}
                    setValue={onQtyFieldChange}
                    error={useError('qty')}
                    focusText
                    fullWidth={false}
                    variant={'standard'}
                  /> : row.qty
                const priceContent = isItemSelected ?
                  <SimpleField
                    type='number'
                    name='price'
                    value={formData.price.value.toString()}
                    setValue={onPriceFieldChange}
                    error={useError('price')}
                    focusText
                    fullWidth={false}
                    variant={'standard'}
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
                const variants = {
                  hidden: {height: 0, opacity: 0},
                  showing: {height: 'auto', opacity: 1},
                }
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
                      <TableCell>{formatData(row.date_buy)}</TableCell>
                      <TableCell>{buttons}</TableCell>
                    </TableRow>
                    <AnimatePresence initial={false}>
                      {isItemSelected && isItemWithSales &&
                        <tr>
                          <td colSpan={5}>
                            <motion.div
                              style={{overflow: 'hidden'}}
                              initial='hidden'
                              variants={variants}
                              animate='showing'
                              exit='hidden'
                            >
                              <SalesItemsTable itemSales={itemSales}/>
                            </motion.div>
                          </td>
                        </tr>
                      }
                    </AnimatePresence>
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
        count={countOfRows}
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
