import React from 'react';
import * as yup from 'yup'
import {DataGrid, GridColumns, GridRenderCellParams, GridRowId} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../../components/Form/style";
import {updateSeller} from "../../store/actions/sellers";
import {SellersPayload} from "../../store/slices/sellersSlice";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {useDictionary, useFetchAccess, useMuiLanguage} from "../../hooks/pages";
import DeleteButton from "./DeleteButton";
import EditToolbar from "./EditToolbar";
import SellerDetail from "./SellerDetail";


const TableSellers = ({sellers}: SellersPayload) => {
  const d = useDictionary('sellers')
  const editSellerAccess = useFetchAccess(updateSeller)
  const muiLanguage = useMuiLanguage()

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  let sellerSchema = yup.object({
    name: yup.string().required(d['fieldNameError']),
    active: yup.boolean().required(),
  })

  type Seller = yup.InferType<typeof sellerSchema>

  function computeMutation(newRow: Seller, oldRow: Seller) {
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
    async (newRow: Seller, oldRow: Seller) => {
      const mutation = computeMutation(newRow, oldRow);
      if (mutation) {
        const validRow = await sellerSchema.validate(mutation)
        const fetchedRow = await editSellerAccess(validRow)
        setSnackbar({children: d['sellerSuccessfulSaved'], severity: 'success'});
        return fetchedRow
      } else {
        return oldRow // Nothing was changed
      }
    },
    [editSellerAccess],
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
    {field: 'name', headerName: d['name'], width: 180, editable: true,},
    {field: 'active', headerName: d['active'], width: 180, editable: true, disableColumnMenu: true, type: "boolean"},
    {
      field: 'empty', headerName: '', flex: 1, sortable: false, disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <SellerDetail role={params.row.role} sales={params.row.sales}/>
    },
    {
      field: 'buttons',
      headerName: d['delete'],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <DeleteButton
          sellerID={params.row.id}
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

  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        columns={columns}
        rows={sellers}
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
        initialState={{
          sorting: {
            sortModel: [{ field: 'active', sort: 'desc' }],
          },
        }}
      />

      <Snackbar
        open={!!snackbar}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <Alert {...snackbar} onClose={handleCloseSnackbar}/>
      </Snackbar>
    </Box>
  );
};

export default TableSellers;