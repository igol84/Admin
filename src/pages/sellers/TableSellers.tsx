import React from 'react';
import {DataGrid, GridColumns, GridRenderCellParams} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import {useBoxTableStyle} from "../../components/Form/style";
import {SellerResponse, updateSeller} from "../../store/actions/sellers";
import {SellersPayload} from "../../store/slices/sellersSlice";
import {trimmedRow} from "../../hooks/form-data";
import equal from "fast-deep-equal";
import {useEditAccess} from "../../hooks/pages";

const TableSellers = ({sellers}: SellersPayload) => {
  const boxTableStyle = useBoxTableStyle()
  const editAccess = useEditAccess(updateSeller)
  const headerEditeSeller = React.useCallback(
    (newRow: SellerResponse, oldRow: SellerResponse) => {
      const sellerWithTrimmedName = trimmedRow('name')(newRow)
      if (!equal(sellerWithTrimmedName, oldRow)) {
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
    </Box>
  );
};

export default TableSellers;