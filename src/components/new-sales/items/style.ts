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
    '& .items': {
      pr: 1,
      overflow: "hidden",
      overflowY: "scroll",
      height: "60vh",
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
      '& .MuiIconButton-root': {
        py: 0
      },
      '& .product': {
        p: 1,
        minHeight: "50px",
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
        backgroundColor: colors.blueAccent[800],
        '& .color': {
          py: 1,
          minHeight: 36,
          '&:not(:last-child)': {
            mb: 1,
          },
          '& .color-row': {
            minHeight: '36px',
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