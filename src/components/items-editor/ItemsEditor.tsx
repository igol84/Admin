import React, {useState} from 'react'
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
import {FieldNames, FormFields, ItemForm} from "./types"
import {useOrder, usePages} from "./hooks";
import EnhancedTableHead from "./EnhancedTableHead";
import {getComparator, HeadCell} from "../../hooks/form-data";
import DeleteButton from "./DeleteButton";
import LoadingCircular from "../LoadingCircular";
import produce from "immer";
import {SimpleField} from "../Form";
import SaveButton from "./SaveButton";
import CloseIcon from "@mui/icons-material/Close";
import {GridActionsCellItem} from "@mui/x-data-grid";


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

  const isSelected = (id: number) => id === formData.id
  const initialFormFields: FormFields = {
    id: null,
    qty: {value: '', error: ''},
    price: {value: '', error: ''},
  }
  const [formData, setFormData] = useState<FormFields>(initialFormFields)

  const onQtyFieldChange = (qty: string) => {
    if (Number(qty) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.qty.value = Number(qty).toString()
      }))
  }

  const onPriceFieldChange = (price: string) => {
    if (Number(price) >= 0)
      setFormData(produce(prevFormData => {
        prevFormData.price.value = price
      }))
  }

  const resetFormData = () => {
    setFormData(initialFormFields)
  }
  const useError = (fieldName: FieldNames) => formData[fieldName].error

  const handleClick = async (event: React.MouseEvent<unknown>, id: number, qty: number, price: number) => {
    if (formData.id !== id) {
      await fetchSalesByItemAccess({itemId: id})
      setFormData(produce(prevFormData => {
        prevFormData.id = id
        prevFormData.qty.value = qty.toString()
        prevFormData.price.value = price.toString()
      }))
    }
  }
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

                const buttons = isItemSelected ?
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <SaveButton
                      id={row.id}
                      qty={Number(formData.qty.value)}
                      price={Number(formData.price.value)}
                      resetFormData={resetFormData}
                    />
                    <DeleteButton deletable={isDeletable} itemID={row.id}/>
                    <GridActionsCellItem
                      icon={<CloseIcon/>}
                      label={'close'}
                      onClick={resetFormData}
                      color="inherit"
                    />
                  </Box>
                  : null
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id, row.qty, row.buy_price)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      selected={isItemSelected}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{qtyContent}</TableCell>
                      <TableCell>{priceContent}</TableCell>
                      <TableCell>{row.date_buy}</TableCell>
                      <TableCell>
                        {buttons}
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
