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
      backgroundColor: `${colors.greenAccent[700]} !important`
    },
    "& .MuiTableRow-hover:hover:not(.Mui-selected) .MuiTableCell-body": {
      cursor: "pointer",
      backgroundColor: `${colors.primaryAccent[600]} !important`
    },
    '& button .MuiButtonBase-root': {
      color: `${colors.blueAccent[700]} !important`
    },
    '& .MuiInputBase-inputTypeSearch ': {
      color: `${colors.black[100]} !important`
    },
    '& input[type = "search"]::-webkit-search-cancel-button': {
      '-webkit-appearance': 'none',
      height: '1em',
      width: '1em',
      borderRadius: '50em',
      background: 'url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%',
      backgroundSize: 'contain',
      opacity: '0',
      pointerEvents: 'none',
    },
    '& input[type = "search"]:focus::-webkit-search-cancel-button': {
      opacity: '0.5',
      pointerEvents: 'all'
    }
  }
}

export const useDialogStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '& .MuiButton-root': {
      backgroundColor: `${colors.blueAccent[700]} !important`,
      color: `${colors.blueAccent[100]} !important`
    },
    '& #alert-dialog-title': {
      fontSize: '16px'
    },
    '& #alert-dialog-yes': {
      backgroundColor: `${colors.redAccent[700]} !important`,
      color: `${colors.blueAccent[100]} !important`
    },
    '& #alert-dialog-no': {
      backgroundColor: `${colors.greenAccent[700]} !important`,
      color: `${colors.blueAccent[100]} !important`
    }
  }
}