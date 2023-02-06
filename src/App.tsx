import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider, useTheme} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ProSidebarProvider} from "react-pro-sidebar";

import SidebarMenu from "./layout/Sidebar";
import TopBar from "./layout/topBar";

import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";



function App() {
  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ProSidebarProvider>
          <CssBaseline/>
          <div className='app'>
            <SidebarMenu/>
            <main className='content'>
              <TopBar/>
              <Routes>
                <Route path='/auth' element={<Auth/>}/>
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
