import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";

export const useStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    pt: 1,
    flex: 1,
    '& .search': {
      pr: 2,
    },
    '.paper': {
      borderRadius: '4px',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      px: 1,
    },
    '& .items': {
      pr: 1,
      overflow: "hidden",
      overflowY: "scroll",
      height: "70vh",
      direction: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: 1,
      minHeight: '65px',
      '& .buttons': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      '& .product': {
        minHeight: "46px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        '&:not(.selected)': {
          backgroundColor: colors.blueAccent[700],
          color: colors.blueAccent[100]
        },
        '&:not(.selected):hover': {
          backgroundColor: colors.blueAccent[500],
          cursor: 'pointer',
        },
        '&.selected': {
          backgroundColor: colors.blueAccent[800],
        },
      },

      '& .shoes': {
        p: 1,
        backgroundColor: colors.blueAccent[500],
        '&:not(.selected):hover': {
          cursor: 'pointer',
        },
        '& .header': {
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1
        },
        '& .color': {
          py: 1,
          minHeight: 46,

          '&:not(:last-child)': {
            mb: 1,
          },
          '& .color-row': {
            minHeight: '46px',
            display: 'flex',
            gap: 1
          },
          '& .size': {
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.blueAccent[600],
            '&.selected': {
              backgroundColor: colors.blueAccent[700],
              cursor: 'pointer',
            },
            '&:not(.selected):hover': {
              backgroundColor: colors.blueAccent[500],
              cursor: 'pointer',
            },
          },

        },
      },
    },

  }
}