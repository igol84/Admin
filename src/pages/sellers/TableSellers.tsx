import React from 'react';
import * as yup from 'yup'
import {DataGrid, GridActionsCellItem, GridColumns, GridRenderCellParams, GridRowId} from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {Alert, AlertProps, Box, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../../components/Form/style";
import {delSeller, updateSeller} from "../../store/actions/sellers";
import {SellersPayload} from "../../store/slices/sellersSlice";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {useDictionary, useFetchAccess, useMuiLanguage} from "../../hooks/pages";
import AddNewSellerForm from "../../components/sellers/AddNewSellerForm";

function EditToolbar() {
  return (
    <Box sx={{my: 1}}>
      <AddNewSellerForm/>
    </Box>
  );
}

interface DeleteButtonType {
  sellerID: number
  selected: boolean
}

const DeleteButton = (props: DeleteButtonType) => {
  const {sellerID, selected} = props
  const deleteSellerAccess = useFetchAccess(delSeller)
  const onClick = async () => {
    await deleteSellerAccess(sellerID)
  }
  return (
    <Box hidden={!selected}>
      <GridActionsCellItem
        icon={<DeleteIcon/>}
        label="Delete"
        onClick={onClick}
        color="inherit"
      />
    </Box>
  )
}

const TableSellers = ({sellers}: SellersPayload) => {
  const d = useDictionary('sellers')
  const editSellerAccess = useFetchAccess(updateSeller)
  const muiLanguage = useMuiLanguage()

  const [selectedRow, setSelectedRow] = React.useState<GridRowId | null>(null)
  let sellerSchema = yup.object({
    id: yup.number().required().integer(),
    store_id: yup.number().required().integer(),
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


  const columns: GridColumns = [
    {field: 'name', headerName: d['name'], width: 180, editable: true,},
    {field: 'active', headerName: d['active'], width: 180, editable: true, disableColumnMenu: true, type: "boolean"},
    {field: 'empty', headerName: '', flex: 1, sortable: false, disableColumnMenu: true},
    {
      field: 'buttons',
      headerName: d['delete'],
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) =>
        <DeleteButton sellerID={params.row.id} selected={selectedRow == params.row.id}/>
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