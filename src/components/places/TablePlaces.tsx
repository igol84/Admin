import React from 'react';
import * as yup from 'yup'
import {DataGrid, GridColumns, GridRenderCellParams, GridRowId, GridSortModel} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../Form/style";
import {fetchPlaces, updatePlace} from "../../store/actions/places";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {
  useDictionary,
  useFetchAccess,
  useIsLoadingDisplay,
  useLoaderAccess,
  useMuiLanguage,
  useSortModel
} from "../../hooks/pages";
import DeleteButton from "./DeleteButton";
import EditToolbar from "./EditToolbar";
import PlaceDetail from "./PlaceDetail";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";


const SORT_MODEL = 'places-sort-model'

const TablePlaces = () => {
  const d = useDictionary('places')
  const storeId = useStoreId()
  useLoaderAccess(fetchPlaces, {storeId})

  const {isLoading, places} = useAppSelector(state => state.placesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)
  const editPlaceAccess = useFetchAccess(updatePlace)
  const muiLanguage = useMuiLanguage()

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  let placeSchema = yup.object({
    name: yup.string().required(d['fieldNameError']),
    active: yup.boolean().required(),
  })

  type Place = yup.InferType<typeof placeSchema>

  function computeMutation(newRow: Place, oldRow: Place) {
    const trimmedRow = toTrimTheRow('name')(newRow)
    if (equal(trimmedRow, oldRow)) {
      return null
    }
    return trimmedRow
  }

  const boxTableStyle = useBoxTableStyle()
  const handleCloseSnackbar = () => setSnackbar(null);
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const processRowUpdate = React.useCallback(
    async (newRow: Place, oldRow: Place) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await placeSchema.validate(mutation)
        const fetchedRow = await editPlaceAccess(validRow)
        setSnackbar({children: d['placeSuccessfulSaved'], severity: 'success'});
        return fetchedRow
      } else {
        return oldRow // Nothing was changed
      }
    },
    [editPlaceAccess],
  )


  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({children: error.message, severity: 'error'});
  }, []);


  const columns: GridColumns = [
    {field: 'id', headerName: 'id', width: 80, editable: false,},
    {field: 'name', headerName: d['name'], width: 180, editable: true,},
    {field: 'active', headerName: d['active'], width: 180, editable: true, disableColumnMenu: true, type: "boolean"},
    {
      field: 'empty', headerName: '', flex: 1, sortable: false, disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <PlaceDetail role={params.row.role} sales={params.row.sales} expenses={params.row.expenses}/>
    },
    {
      field: 'buttons',
      headerName: d['delete'],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <DeleteButton
          placeID={params.row.id}
          hidden={selectedRow != params.row.id}
          deletable={!(params.row.sales || params.row.expenses)}
        />
    },
  ]


  const handleRowFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget
      const id = row!.dataset.id!
      setSelectedRow(id)
    }, [])

  const defaultLocalSortModel: GridSortModel = [{field: 'active', sort: 'desc'}]
  const [sortModel, onSortModelChange] = useSortModel(defaultLocalSortModel, SORT_MODEL)

  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        columns={columns}
        rows={places}
        experimentalFeatures={{newEditingApi: true}}
        components={{
          Toolbar: EditToolbar,
        }}
        localeText={muiLanguage.components.MuiDataGrid.defaultProps.localeText}
        componentsProps={{
          row: {
            onFocus: handleRowFocus,
          },
        }}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
      />

      <Snackbar
        open={!!snackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert {...snackbar} onClose={handleCloseSnackbar}/>
      </Snackbar>
      <LoadingCircular show={showLoading}/>
    </Box>
  );
};

export default TablePlaces;