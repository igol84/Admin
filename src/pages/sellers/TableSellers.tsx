import React from 'react';
import {DataGrid, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Button, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../../components/Form/style";
import {SellerResponse, updateSeller} from "../../store/actions/sellers";
import {SellersPayload} from "../../store/slices/sellersSlice";
import {toTrimTheRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {useDictionary, useEditAccess} from "../../hooks/pages";


const TableSellers = ({sellers}: SellersPayload) => {
  const d = useDictionary('sellers')
  const handleCloseSnackbar = () => setSnackbar(null);
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const isValid = (seller: SellerResponse) => {
    return seller.name != ''
  }

  function computeMutation(newRow: SellerResponse, oldRow: SellerResponse) {
    const trimmedRow = toTrimTheRow('name')(newRow)
    if (equal(trimmedRow, oldRow)) {
      return null
    } else if(!isValid(trimmedRow)) {
      setSnackbar({children: d['fieldNameError'], severity: 'error'})
      return null
    }
    return trimmedRow
  }

  const boxTableStyle = useBoxTableStyle()
  const editAccess = useEditAccess(updateSeller)

  const processRowUpdate = React.useCallback(
    async (newRow: SellerResponse, oldRow: SellerResponse) =>{
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          const fetchedRow = await editAccess(mutation)
          setSnackbar({children: d['sellerSuccessfulSaved'], severity: 'success'});
          return fetchedRow
        } else {
          return oldRow // Nothing was changed
        }
      },
    [editAccess],
  )

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  const DeleteButton = ({value}: { value: string }) => {
    const onClick = () => {
      console.log('delete by id:', value)
    }
    return <Button color='secondary' variant="contained" onClick={onClick}>{value}</Button>
  }
  const columns: GridColumns = [
    {field: 'name', headerName: 'Name', width: 180, editable: true,},
    {field: 'active', headerName: 'Active', width: 180, editable: true, type: "boolean"},
    {
      field: 'buttons',
      headerName: 'Delete',
      width: 180,
      renderCell: (params: GridRenderCellParams) => <DeleteButton value={params.row.id}/>
    },
  ]


  return (
    <Box height="75vh" sx={boxTableStyle}>
      <DataGrid
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        columns={columns}
        rows={sellers}
        experimentalFeatures={{newEditingApi: true}}
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