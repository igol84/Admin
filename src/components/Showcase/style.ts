import {useTheme} from "@mui/material";
import {tokens} from "../../theme";

export const useStyle = () => {
  // const theme = useTheme()
  // const colors = tokens(theme.palette.mode)
  return {


  }
}

export const useModalStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    '.title': {
      fontSize: '24px'
    },
    '.dialog-x': {
      position: 'absolute',
      right: 8,
      top: 8,
      color: colors.grey[500],
    },
    '.form': {
      width: '600px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }

  }
}