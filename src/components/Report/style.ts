import {useTheme} from "@mui/material";
import {tokens} from "../../theme";

export const useTabStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '.Mui-selected': {
      color: `${colors.greenAccent[400]} !important`
    },
    '.MuiTabs-indicator': {
      backgroundColor: colors.greenAccent[500]
    },
  }
}

export const useChartStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    "axis": {
      "domain": {
        "line": {
          "stroke": colors.greenAccent[500],
          "strokeWidth": 1
        }
      },
      "legend": {
        "text": {
          "fontSize": 12,
          "fill": colors.greenAccent[500]
        }
      },
      "ticks": {
        "line": {
          "stroke": colors.greenAccent[500],
          "strokeWidth": 3
        },
        "text": {
          "fill": colors.greenAccent[500]
        }
      }
    },
    "grid": {
      "line": {
        "stroke": colors.greenAccent[500],
        "strokeWidth": 1
      },

    },
    "legends": {
      "text": {
        "fontSize": 17,
        "fill": colors.greenAccent[500]
      },
    },
    "tooltip": {
      "container": {
        "background": colors.greenAccent[900],
        "color": colors.greenAccent[200],
        "fontSize": 15
      },
    }
  }
}