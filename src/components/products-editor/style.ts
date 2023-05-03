import {useTheme} from "@mui/material";
import {tokens} from "../../theme";

export const useStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    pr: "8px",
    maxHeight: "60vh",
    overflow: "hidden",
    overflowY: "scroll",
    '.paper': {
      borderRadius: '4px',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      p: 1,
    },
    '& .MuiStack-root': {
      direction: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: 1
    },
    '& .product': {},
    '& .product:not(.selected)': {
      backgroundColor: colors.blueAccent[700],
      color: colors.blueAccent[100]
    },
    '& .product:not(.selected):hover': {
      cursor: 'pointer',
    },

    '& .color': {
      p: 1,
      mt: 1,
      minHeight: 36,
      '&:not(:last-child)': {
        mb: 1,
      },
    },

    '& .name-field': {
      minHeight: 46,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      '&:not(.selected):hover': {
        cursor: 'pointer',
      },
    },

    '& .color-field': {
      minHeight: 46,
      display: 'flex',
      justifyContent: 'space-between',
      gap: 1,
      '&:not(.selected):hover': {
        cursor: 'pointer',
      },
    },

    '& .size': {
      borderRadius: '4px',
      minHeight: '60px',
      m: 1,
      backgroundColor: colors.greenAccent[800],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
      '&.selected': {
        p: 1,
        backgroundColor: colors.greenAccent[600],
      },
      '&:not(.selected):hover': {
        backgroundColor: colors.greenAccent[600],
        cursor: 'pointer',
      },
    },


  }
}