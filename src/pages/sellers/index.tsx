import React from 'react';
import Header from "../../components/Header";
import {Box, Button, useTheme} from "@mui/material";
import {useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchSellers} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useAccess, useIsLoadingDisplay} from "../../hooks/pages";
import {DataGrid, GridColumns} from "@mui/x-data-grid";
import {useBoxTableStyle} from "../../components/Form/style";

const Sellers = () => {
  const storeId = useStoreId()
  const fetchAccessSellers = useAccess(fetchSellers, {storeId})
  const {isLoading, sellers} = useAppSelector(state => state.sellersReducer)
  const showLoading = useIsLoadingDisplay(isLoading)
  const onClick = () => fetchAccessSellers()

  const columns: GridColumns = [
    {field: 'name', headerName: 'Name', width: 180, editable: true},
    {field: 'active', headerName: 'Active', width: 180, editable: true},
  ]
  const boxTableStyle = useBoxTableStyle()
  return (
    <Box m='20px' sx={boxTableStyle}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title='Sellers' subTitle='Sellers page'/>
      </Box>
      <LoadingCircular show={showLoading}/>
      <Button color='secondary' variant="contained" onClick={onClick}>
        Update
      </Button>
      <Box height="75vh" >
        <DataGrid
          columns={columns}
          rows={sellers}
          experimentalFeatures={{newEditingApi: true}}
        />
      </Box>
    </Box>
  );
};

export default Sellers;