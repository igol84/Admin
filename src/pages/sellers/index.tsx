import React from 'react';
import Header from "../../components/Header";
import {Alert, AlertProps, Box, Button, Snackbar} from "@mui/material";
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchSellers, updateSeller} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useAccess, useDictionary, useIsLoadingDisplay} from "../../hooks/pages";
import {DataGrid, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {useBoxTableStyle} from "../../components/Form/style";


const Sellers = () => {
  const d = useDictionary('sellers')
  const storeId = useStoreId()
  const fetchAccessSellers = useAccess(fetchSellers, {storeId})

  const {isLoading, sellers} = useAppSelector(state => state.sellersReducer)
  const showLoading = useIsLoadingDisplay(isLoading)
  const onClickUpdate = () => fetchAccessSellers()

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
  const boxTableStyle = useBoxTableStyle()
  const handleCloseSnackbar = () => setSnackbar(null);
  const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    setSnackbar({children: error.message, severity: 'error'});
  }, []);
  const dispatch = useAppDispatch()
  const access_token = useAppSelector(state => state.authReducer.access_token)
  return (
    <Box m='8px'>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <LoadingCircular show={showLoading}/>
      <Button color='secondary' variant="contained" onClick={onClickUpdate}>
        Update
      </Button>
      <Box height="75vh" sx={boxTableStyle}>
        <DataGrid
          processRowUpdate={(newRow: any) => dispatch(updateSeller(access_token, newRow))}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          columns={columns}
          rows={sellers}
          experimentalFeatures={{newEditingApi: true}}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar}/>
          </Snackbar>
        )}
      </Box>
    </Box>
  );
};

export default Sellers;