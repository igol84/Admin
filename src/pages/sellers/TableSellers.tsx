import React from 'react';
import {DataGrid, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {Alert, AlertProps, Box, Button, Snackbar} from "@mui/material";
import {useBoxTableStyle} from "../../components/Form/style";
import {SellerResponse, updateSeller} from "../../store/actions/sellers";
import {SellersPayload} from "../../store/slices/sellersSlice";
import {trimmedRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {useDictionary, useEditAccess} from "../../hooks/pages";


const TableSellers = ({sellers}: SellersPayload) => {
  const d = useDictionary('sellers')
  const handleCloseSnackbar = () => setSnackbar(null);
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

  const isValid = (seller: SellerResponse) => {
    setSnackbar({children: d['fieldNameError'], severity: 'error'});
    return seller.name != ''
  }

  const boxTableStyle = useBoxTableStyle()
  const editAccess = useEditAccess(updateSeller)
  const headerEditeSeller = React.useCallback(
    (newRow: SellerResponse, oldRow: SellerResponse) => {
      const sellerWithTrimmedName = trimmedRow('name')(newRow)
      if (!equal(sellerWithTrimmedName, oldRow) && isValid(sellerWithTrimmedName)) {
        setSnackbar({children: d['sellerSuccessfulSaved'], severity: 'success'});
        return editAccess(newRow)
      }
      return oldRow
    }, []
  )

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
        processRowUpdate={(newRow, oldRow) => headerEditeSeller(newRow, oldRow)}
        onProcessRowUpdateError={(error) => console.log(error.message)}
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