import {useTheme} from "@mui/material";
import {tokens} from "../../theme";


export const useBoxTableStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    mt: '40px',
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
  }
}