import React from 'react';
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {
  useDictionaryTranslate,
  useErrorMessage,
  useFetchAccess,
  useIsLoadingDisplay,
  useLoaderAccess,
  useMuiLanguage,
  useSortModel
} from "../../hooks/pages";

import {DataGrid, GridColumns, GridRenderCellParams, GridRowId, GridSortModel} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";

import {useBoxGridTableStyle} from "../Form/style";
import LoadingCircular from "../LoadingCircular";
import {delTagUrl, fetchTagUrls} from "../../store/actions/tag_url";
import {useHandlerUpdate} from "./updateHandler";
import {TagUrl} from "../../schemas/base";
import AddNewTagUrlForm from "./AddNewTagUrlForm";
import DeleteButton from "../Form/DeleteButton";
import {renderSelectEditInputTagUrlCell} from "./ParentCell";

const SORT_MODEL = 'tag-sort-model'

const TagUrls = () => {
  const d = useDictionaryTranslate('tagUrl')
  const df = useDictionaryTranslate('form')
  const muiLanguage = useMuiLanguage()
  const boxTableStyle = useBoxGridTableStyle()
  const storeId = useStoreId()
  const handlerRowUpdate = useHandlerUpdate()
  const deleteAccess = useFetchAccess(delTagUrl)
  const onClickDelete = async (url: string) => {
    await deleteAccess(url)
  }
  useLoaderAccess(fetchTagUrls, {storeId})
  const {isLoading, tagUrls} = useAppSelector(state => state.tagUrlsReducer)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null)
  const handleCloseSnackbar = () => setSnackbar(null)

  const processRowUpdate = React.useCallback(
    async (newRow: TagUrl, oldRow: TagUrl) => {
      const updatedRow = await handlerRowUpdate(newRow, oldRow)
      setSnackbar({children: 'expenseSuccessfulSaved', severity: 'success'});
      return updatedRow
    },
    [],
  )

  const onProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({children: error.message, severity: 'error'});
  }, [])

  const columns: GridColumns = [
    {field: 'url', headerName: 'url', minWidth: 120, flex: 1, editable: false},
    {
      field: 'parent', headerName: d('parent'), minWidth: 120, flex: 1, editable: true,
      renderEditCell: renderSelectEditInputTagUrlCell,
    },
    {field: 'order_number', headerName: d('orderNumber'), flex: 1, editable: true, type: 'number'},
    {field: 'search', headerName: d('search'), minWidth: 120, flex: 1, editable: true},
    {field: 'search_ua', headerName: d('searchUa'), minWidth: 100, flex: 1, editable: true},
    {field: 'desc', headerName: d('desc'), minWidth: 120, flex: 1, editable: true},
    {field: 'desc_ua', headerName: d('descUa'), minWidth: 100, flex: 1, editable: true},
    {field: 'text', headerName: d('text'), minWidth: 120, flex: 1, editable: true},
    {field: 'text_ua', headerName: d('textUa'), minWidth: 100, flex: 1, editable: true},
    {
      field: 'buttons',
      headerName: df('delete'),
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams<TagUrl, TagUrl>) =>
        <DeleteButton deletable={selectedRow === params.row.url} onRemove={() => onClickDelete(params.row.url)}/>
    },
  ]

  const handleRowFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget
      const id = row!.dataset.id!
      setSelectedRow(id)
    }, [])
  const defaultLocalSortModel: GridSortModel = [{field: 'url', sort: 'desc'}]
  const [sortModel, onSortModelChange] = useSortModel(defaultLocalSortModel, SORT_MODEL)
  const errorText = useAppSelector(state => state.tagUrlsReducer.error)
  const [openAlertSnackbar, handleCloseAlertSnackbar, errorTextNetwork] = useErrorMessage(errorText)
  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        columns={columns}
        rows={tagUrls}
        getRowId={(row) => row.url}
        experimentalFeatures={{newEditingApi: true}}
        components={{
          Toolbar: AddNewTagUrlForm,
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

export default TagUrls;