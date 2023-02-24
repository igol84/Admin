import {ColorModeContext, useThemeMode} from "../theme";
import {ThemeProvider as ThemeProvide} from "@mui/material";


interface Props {
  children: JSX.Element
}

const ThemeProvider = (props: Props) => {
  const {children} = props
  const [theme, colorMode] = useThemeMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvide theme={theme}>
        {children}
      </ThemeProvide>
    </ColorModeContext.Provider>
  )
}

export default ThemeProvider