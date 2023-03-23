import {useTheme} from "@mui/material";
import {tokens} from "../../theme";

export const useStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '& .MuiPaper-root:not(.selected)': {
      backgroundColor: `${colors.blueAccent[700]} !important`,
      color: `${colors.blueAccent[100]} !important`
    },
    '& .MuiPaper-root:not(.selected):hover': {
      backgroundColor: `${colors.blueAccent[500]} !important`,
      cursor: 'pointer',
    },
  }
}