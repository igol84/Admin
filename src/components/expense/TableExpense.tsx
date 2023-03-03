import React from 'react';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSortModel,
  GridValueFormatterParams
} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../Form/style";
import {fetchExpenses} from "../../store/actions/expenses";
import {
  useDictionary,
  useErrorMessage,
  useIsLoadingDisplay,
  useLoaderAccess,
  useMuiLanguage,
  useSortModel
} from "../../hooks/pages";
import ExpenseDetail from "./ExpenseDetail";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";
import {Expense} from "../../schemas/expense";
import {renderCellPlace, renderSelectEditInputPlaceCell} from "./PlaceCell";
import EditToolbar from "./EditToolbar";
import {useHandlerUpdate} from "./updateHandler";
import DeleteButton from "./DeleteButton";
import {parse} from "date-fns";


const SORT_MODEL = 'expenses-sort-model'


const TableExpense = () => {
  const d = useDictionary('expense')
  const df = useDictionary('form')
  const muiLanguage = useMuiLanguage()
  const boxTableStyle = useBoxTableStyle()
  const handlerRowUpdate = useHandlerUpdate()

  const storeId = useStoreId()
  useLoaderAccess(fetchExpenses, {storeId})

  const {isLoading, expenses} = useAppSelector(state => state.expensesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const handleCloseSnackbar = () => setSnackbar(null);


  const processRowUpdate = React.useCallback(
    async (newRow: Expense, oldRow: Expense) => {
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
    {
      field: 'date_cost', headerName: d['date_cost'], minWidth: 120, flex: 1, editable: true, type: "date",
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        const date = parse(params.value, 'yyyy-MM-dd', new Date())
        return date.toLocaleDateString()
      }
    },
    {
      field: 'place_id', headerName: d['place_id'], minWidth: 120, flex: 1, editable: true,
      renderEditCell: renderSelectEditInputPlaceCell,
      renderCell: renderCellPlace

    },
    {field: 'desc', headerName: d['desc'], minWidth: 120, flex: 1, editable: true,},
    {field: 'cost', headerName: d['cost'], minWidth: 100, flex: 1, editable: true, type: 'number'},

    {
      field: 'empty', headerName: '', flex: 3, sortable: false, disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <ExpenseDetail role={params.row.role} sales={params.row.sales}/>
    },
    {
      field: 'buttons',
      headerName: df['delete'],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <DeleteButton
          expenseID={params.row.id}
          hidden={selectedRow != params.row.id}
          deletable={true}
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

  const errorText = useAppSelector(state => state.expensesReducer.error)
  const [openAlertSnackbar, handleCloseAlertSnackbar, errorTextNetwork] = useErrorMessage(errorText)

  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        columns={columns}
        rows={expenses}
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

export default TableExpense;