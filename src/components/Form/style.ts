import {useTheme} from "@mui/material";
import {tokens} from "../../theme";


export const useBoxGridTableStyle = () => {
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
      backgroundColor: `${colors.greenAccent[900]} !important`,
      color: `${colors.primary[100]} !important`,
      '& .MuiSelect-outlined': {
        color: `${colors.greenAccent[100]} !important`,
      },
      '& svg': {
        color: `${colors.greenAccent[100]} !important`,
      }
    },
    '& .MuiDataGrid-editInputCell': {
      color: colors.black[100],
    },
    '& .Mui-selected': {
      backgroundColor: `${colors.greenAccent[700]} !important`,
      borderColor: `${colors.primary[200]} !important`
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none !important',
    },
    '& .MuiDataGrid-columnHeader:focus': {
      outline: 'none !important',
    },
    '& .MuiInputBase-input::-webkit-calendar-picker-indicator': {
      color: colors.black[100],
    },
    '& ::-webkit-calendar-picker-indicator': {
      filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
    }
  }
}

export const useBoxTableStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '& .MuiTableCell-head': {
      backgroundColor: `${colors.blueAccent[700]} !important`,
      color: `${colors.blueAccent[100]} !important`
    },
    '& .MuiTableCell-body': {
      backgroundColor: `${colors.primary[400]} !important`
    },
    '& .MuiToolbar-root': {
      backgroundColor: `${colors.blueAccent[700]} !important`
    },
    '& .Mui-selected .MuiTableCell-body': {
      backgroundColor: `${colors.primary[500]} !important`
    },

  }
}