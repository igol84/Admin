import {useTheme} from "@mui/material";
import {tokens} from "../../../theme";

export const useStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '.paper': {
      borderRadius: '4px',
      backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      px: 1,
    },
    flex: 1,
    pr: 1,
    '& ::-webkit-calendar-picker-indicator': {
      filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
    },
    '& .saleForm': {
      py: 1,
      pr: 2,
      '& .buttonConfirm': {
        px: 8
      },
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
      '& .product': {
        p: 1,
        minHeight: "50px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        '& .buttons': {
          display: 'flex',
          justifyContent: 'space-between'
        },
        '&:not(.selected)': {
          backgroundColor: colors.blueAccent[700],
          color: colors.blueAccent[100]
        },
        '&:not(.selected):hover': {
          backgroundColor: colors.blueAccent[700],
          cursor: 'pointer',
        },
        '&.selected': {
          backgroundColor: colors.blueAccent[800],
        },
      },
      '& .sales': {
        gap: 1,
        '& .sale': {
          '& .header': {
            borderRadius: '4px 4px 0 0',
            p: 1,
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.greenAccent[700],
          },
          '& .item': {
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
            minHeight: "50px",
            p: 1,
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.blueAccent[700],
            '& .buttons': {
              display: 'flex',
              justifyContent: 'space-between'
            },
            '&:last-child': {
              borderRadius: '0 0 4px 4px',
            },
            '&:not(.selected)': {
              backgroundColor: colors.blueAccent[700],
              color: colors.blueAccent[100]
            },
            '&:not(.selected):hover': {
              backgroundColor: colors.blueAccent[800],
              cursor: 'pointer',
            },
            '&.selected': {
              backgroundColor: colors.blueAccent[800],
            },
          },

        }
      },
    },

  }
}