import React from 'react';
import * as yup from 'yup'
import {DataGrid, GridColumns, GridRenderCellParams, GridRowId, GridSortModel} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxGridTableStyle} from "../Form/style";
import {fetchPlaces, updatePlace} from "../../store/actions/places";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {
  useDictionary,
  useErrorMessage,
  useFetchAccess,
  useIsLoadingDisplay,
  useLoaderAccess,
  useMuiLanguage,
  useSortModel
} from "../../hooks/pages";

import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {Item} from "../../schemas/new-products";


// const SORT_MODEL = 'items-sort-model'

const TableItems = () => {
  // const d = useDictionary('items')
  const storeId = useStoreId()
  // useLoaderAccess(fetchPlaces, {storeId})

  const items = [{
    "prod_id": 1,
    "store_id": 1,
    "qty": 6,
    "buy_price": 20,
    "date_buy": new Date("2021-02-25"),
    "id": 1,

      "type": "product",
      "name": "batary",
      "price": 180,
      "shoes": null

  },
    {
      "prod_id": 2,
      "store_id": 1,
      "qty": 6,
      "buy_price": 5,
      "date_buy": "2021-02-25",
        "type": "shoes",
        "name": "conv",
        "price": 111,
        "id": 2,
        "shoes": {
          "id": 2,
          "color": "red-white",
          "size": 43,
          "length": 28,
          "width": "Wide"
        }

    },]
  // const {isLoading, items} = useAppSelector(state => state.placesReducer)
  // const showLoading = useIsLoadingDisplay(isLoading)
  // const editPlaceAccess = useFetchAccess(updatePlace)
  const muiLanguage = useMuiLanguage()

  // const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  // let placeSchema = yup.object({
  //   name: yup.string().required(d['fieldNameError']),
  //   active: yup.boolean().required(),
  // })

  // type Place = yup.InferType<typeof placeSchema>
  //
  // function computeMutation(newRow: Place, oldRow: Place) {
  //   const trimmedRow = toTrimTheRow('name')(newRow)
  //   if (equal(trimmedRow, oldRow)) {
  //     return null
  //   }
  //   return trimmedRow
  // }

  const boxTableStyle = useBoxGridTableStyle()
  // const handleCloseSnackbar = () => setSnackbar(null);
  // const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  // const processRowUpdate = React.useCallback(
  //   async (newRow: Place, oldRow: Place) => {
  //     const mutation = computeMutation(newRow, oldRow);
  //     if (mutation) {
  //       const validRow = await placeSchema.validate(mutation)
  //       const fetchedRow = await editPlaceAccess(validRow)
  //       setSnackbar({children: d['placeSuccessfulSaved'], severity: 'success'});
  //       return fetchedRow
  //     } else {
  //       return oldRow // Nothing was changed
  //     }
  //   },
  //   [editPlaceAccess],
  // )

  //
  // const handleProcessRowUpdateError = React.useCallback((error: Error) => {
  //   setSnackbar({children: error.message, severity: 'error'});
  // }, []);


  const columns: GridColumns = [
    {field: 'id', headerName: 'id', width: 80, editable: false,},
    {field: 'name', headerName: 'name', width: 180, editable: false,},
    {field: 'qty', headerName: 'qty', width: 180, editable: true, type: "number"},
    {field: 'buy_price', headerName: 'priceBuy', width: 180, editable: true, type: "number"},
    {field: 'date_buy', headerName: 'Date', width: 180, editable: true, type: "date"},
    {field: 'empty', headerName: '', flex: 1, sortable: false, disableColumnMenu: true},
    // {
    //   field: 'buttons',
    //   headerName: d['delete'],
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params: GridRenderCellParams) =>
    //     <DeleteButton
    //       placeID={params.row.id}
    //       hidden={selectedRow != params.row.id}
    //       deletable={!(params.row.sales || params.row.expenses)}
    //     />
    // },
  ]


  // const handleRowFocus = React.useCallback(
  //   (event: React.FocusEvent<HTMLDivElement>) => {
  //     const row = event.currentTarget
  //     const id = row!.dataset.id!
  //     setSelectedRow(id)
  //   }, [])

  // const defaultLocalSortModel: GridSortModel = [{field: 'active', sort: 'desc'}]
  // const [sortModel, onSortModelChange] = useSortModel(defaultLocalSortModel, SORT_MODEL)
  //
  // const errorText = useAppSelector(state => state.placesReducer.error)
  // const [openAlertSnackbar, handleCloseAlertSnackbar, errorTextNetwork] = useErrorMessage(errorText)

  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        // processRowUpdate={processRowUpdate}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        columns={columns}
        rows={items}
        experimentalFeatures={{newEditingApi: true}}
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        localeText={muiLanguage.components.MuiDataGrid.defaultProps.localeText}
        // componentsProps={{
        //   row: {
        //     onFocus: handleRowFocus,
        //   },
        // }}
        // sortModel={sortModel}
        // onSortModelChange={onSortModelChange}
      />

      {/*<Snackbar*/}
      {/*  open={!!snackbar}*/}
      {/*  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}*/}
      {/*  onClose={handleCloseSnackbar}*/}
      {/*  autoHideDuration={6000}*/}
      {/*>*/}
      {/*  <Alert {...snackbar} onClose={handleCloseSnackbar}/>*/}
      {/*</Snackbar>*/}
      {/*<LoadingCircular show={showLoading}/>*/}
      {/*<Snackbar open={openAlertSnackbar} autoHideDuration={6000} onClose={handleCloseAlertSnackbar}>*/}
      {/*  <Alert variant="filled" onClose={handleCloseAlertSnackbar} severity="error">*/}
      {/*    {errorTextNetwork}*/}
      {/*  </Alert>*/}
      {/*</Snackbar>*/}
    </Box>
  );
};

export default TableItems;