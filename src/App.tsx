import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import TopBar from "./scenes/global/TopBar";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import {ProSidebarProvider} from "react-pro-sidebar";


function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline/>
          <div className='app'>
            <Sidebar/>
            <main className='content'>
              <TopBar/>
              <Routes>
                <Route path='/' element={<Dashboard/>}/>
                <Route path='/team' element={<Dashboard/>}/>
              </Routes>
            </main>
          </div>
        </ProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
