import {useTheme} from "@mui/material";
import {tokens} from "../../theme";


export const useBoxTableStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    mt: '8px',
    '& .MuiDataGrid-root': {
      border: 'none'
    },
    '& .MuiDataGrid-cell': {
      borderBottom: 'none'
    },
    '& .name-column--cell': {
      color: colors.greenAccent[300]
    },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: colors.blueAccent[700],
      borderBottom: 'none'
    },
    '& .MuiDataGrid-virtualScroller': {
      backgroundColor: colors.primary[400]
    },
    '& .MuiDataGrid-footerContainer': {
      borderTop: 'none',
      backgroundColor: colors.blueAccent[700]
    },
    '& .MuiDataGrid-cell--editing': {
      backgroundColor: `${colors.greenAccent[300]} !important`,
      color: `${colors.blueAccent[600]} !important`
    },
    '& .MuiDataGrid-editInputCell': {
      color: colors.black[900],
    },
    '& .Mui-selected': {
      backgroundColor: `${colors.primary[200]} !important`,
      borderColor: `${colors.primary[200]} !important`
    },
  }
}