import React from 'react';
import * as yup from 'yup'
import {DataGrid, GridColumns, GridRenderCellParams, GridRowId, GridSortModel} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../Form/style";
import {fetchExpenses, updateExpense} from "../../store/actions/expenses";
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
import DeleteButton from "./DeleteButton";
import EditToolbar from "./EditToolbar";
import ExpenseDetail from "./ExpenseDetail";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import LoadingCircular from "../LoadingCircular";


const SORT_MODEL = 'expenses-sort-model'


const TableExpense = () => {
  const d = useDictionary('expenses')
  const storeId = useStoreId()
  useLoaderAccess(fetchExpenses, {storeId})

  const {isLoading, expenses} = useAppSelector(state => state.expensesReducer)
  const showLoading = useIsLoadingDisplay(isLoading)
  const editExpenseAccess = useFetchAccess(updateExpense)
  const muiLanguage = useMuiLanguage()

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  let expenseSchema = yup.object({
    name: yup.string().required(d['fieldNameError']),
    active: yup.boolean().required(),
  })

  type Expense = yup.InferType<typeof expenseSchema>

  function computeMutation(newRow: Expense, oldRow: Expense) {
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
    async (newRow: Expense, oldRow: Expense) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await expenseSchema.validate(mutation)
        const fetchedRow = await editExpenseAccess(validRow)
        setSnackbar({children: d['expenseSuccessfulSaved'], severity: 'success'});
        return fetchedRow
      } else {
        return oldRow // Nothing was changed
      }
    },
    [editExpenseAccess],
  )


  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({children: error.message, severity: 'error'});
  }, []);

  const deletable = (role: string, sales: number) => {
    if (!!role) return false
    else if (sales) return false
    return true
  }
  const columns: GridColumns = [
    {field: 'id', headerName: 'id', width: 80, editable: false,},
    {field: 'name', headerName: d['name'], width: 180, editable: true,},
    {field: 'active', headerName: d['active'], width: 180, editable: true, disableColumnMenu: true, type: "boolean"},
    {
      field: 'empty', headerName: '', flex: 1, sortable: false, disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <ExpenseDetail role={params.row.role} sales={params.row.sales}/>
    },
    {
      field: 'buttons',
      headerName: d['delete'],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <DeleteButton
          expenseID={params.row.id}
          hidden={selectedRow != params.row.id}
          deletable={deletable(params.row.role, params.row.sales)}
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
        onProcessRowUpdateError={handleProcessRowUpdateError}
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