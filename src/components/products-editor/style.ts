import {useTheme} from "@mui/material";
import {tokens} from "../../theme";

export const useStyle = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return {
    pr: "8px",
    maxHeight: "75vh",
    overflow: "hidden",
    overflowY: "scroll",
    '& .MuiStack-root': {
      direction: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: "16px"
    },
    '& .MuiIconButton-root': {
      py: 0
    },
    '& .MuiPaper-root:not(.selected)': {
      backgroundColor: colors.blueAccent[700],
      color: colors.blueAccent[100]
    },
    '& .MuiPaper-root:not(.selected):hover': {
      backgroundColor: colors.blueAccent[500],
      cursor: 'pointer',
    },
    '& .MuiPaper-root.selected': {
      backgroundColor: colors.blueAccent[800],
    },
    '& .color': {
      p: 1,
      mt: 1,
      minHeight: 36,
    },
    '& .color:not(:last-child)': {
      mb: 1,
    },
    '& .color-field': {
      display: 'flex', justifyContent: 'space-between', gap: 1
    },
    '& .color-field:not(.selected):hover': {
      cursor: 'pointer',
    },
  }
}