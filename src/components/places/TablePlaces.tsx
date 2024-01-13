import React, {useEffect} from 'react';
import * as yup from 'yup'
import {DataGrid, GridColumns, GridRenderCellParams, GridRowId, GridSortModel} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxGridTableStyle} from "../Form/style";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {
  useAccess,
  useDictionary,
  useErrorMessage,
  useIsLoadingDisplay,
  useMuiLanguage,
  useSortModel
} from "../../hooks/pages";
import DeleteButton from "./DeleteButton";
import EditToolbar from "./EditToolbar";
import PlaceDetail from "./PlaceDetail";
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {fetchPlaces, updatePlace} from "../../store/slices/placesSlice";
import {createApi} from "../../ky";
import {PlaceWithDetails} from "../../schemas/place";


const SORT_MODEL = 'places-sort-model'

const TablePlaces = () => {
  useAccess()
  const d = useDictionary('places')
  const dispatch = useAppDispatch()
  const storeId = useStoreId()
  const api = createApi()
  useEffect(() => {
    if (storeId)
      dispatch(fetchPlaces({storeId, api}))
  }, [storeId]);


  const {isLoading, places} = useAppSelector(state => state.placesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)

  const editPlaceAccess = async (place: PlaceWithDetails) => {
    dispatch(updatePlace({place, api}))
    return place
  }
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

  const boxTableStyle = useBoxGridTableStyle()
  const handleCloseSnackbar = () => setSnackbar(null);
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const processRowUpdate = React.useCallback(
    async (newRow: Place, oldRow: Place) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await placeSchema.validate(mutation) as PlaceWithDetails
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
          placeId={params.row.id}
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

  const errorText = useAppSelector(state => state.placesReducer.error)
  const [openAlertSnackbar, handleCloseAlertSnackbar, errorTextNetwork] = useErrorMessage(errorText)

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
      <Snackbar open={openAlertSnackbar} autoHideDuration={6000} onClose={handleCloseAlertSnackbar}>
        <Alert variant="filled" onClose={handleCloseAlertSnackbar} severity="error">
          {errorTextNetwork}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TablePlaces;