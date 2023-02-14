import React from 'react';
import equal from 'fast-deep-equal';
import Header from "../../components/Header";
import {Box, Button} from "@mui/material";
import {useAppDispatch, useAppSelector, useStoreId} from "../../hooks/redux";
import {fetchSellers, SellerResponse, updateSeller} from "../../store/actions/sellers";
import LoadingCircular from "../../components/LoadingCircular";
import {useAccess, useDictionary, useIsLoadingDisplay} from "../../hooks/pages";
import {DataGrid, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {useBoxTableStyle} from "../../components/Form/style";
import {trimmedRow} from "../../hooks/form-data";


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

  const dispatch = useAppDispatch()
  const access_token = useAppSelector(state => state.authReducer.access_token)

  const headerEditeSeller = React.useCallback(
    (newRow: SellerResponse, oldRow: SellerResponse) => {
      const sellerWithTrimmedName = trimmedRow('name')(newRow)
      if (!equal(sellerWithTrimmedName, oldRow)) {
        return dispatch(updateSeller(access_token, sellerWithTrimmedName))
      }
      return oldRow
    }, [dispatch]
  )
  return (
    <Box m={1}>
      <Box display='flex' justifyContent='space-around' alignItems='center'>
        <Header title={d['title']}/>
      </Box>
      <LoadingCircular show={showLoading}/>
      <Button color='secondary' variant="contained" onClick={onClickUpdate}>
        Update
      </Button>
      <Box height="75vh" sx={boxTableStyle}>
        <DataGrid
          processRowUpdate={(newRow, oldRow) => headerEditeSeller(newRow, oldRow)}
          onProcessRowUpdateError={(error) => console.log(error.message)}
          columns={columns}
          rows={sellers}
          experimentalFeatures={{newEditingApi: true}}
        />
      </Box>
    </Box>
  );
};

export default Sellers;