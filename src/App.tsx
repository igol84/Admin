import {ColorModeContext, useThemeMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {ProSidebarProvider} from "react-pro-sidebar";

import SidebarMenu from "./layout/Sidebar";
import TopBar from "./layout/topBar";

import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import React from "react";
import {LanguageModeContext, useLanguageMode} from "./language";
import Sellers from "./pages/sellers";
import Places from "./pages/places";

function App() {
  const [theme, colorMode] = useThemeMode()
  const [LanguageMode] = useLanguageMode()

  return (
    <LanguageModeContext.Provider value={LanguageMode}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <ProSidebarProvider>
            <CssBaseline/>
            <div className='app'>
              <SidebarMenu/>
              <main className='content'>
                <TopBar/>
                <Routes>
                  <Route path='/' element={<Dashboard/>}/>
                  <Route path='/auth' element={<Auth/>}/>
                  <Route path='/sellers' element={<Sellers/>}/>
                  <Route path='/places' element={<Places/>}/>
                </Routes>
              </main>
            </div>
          </ProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LanguageModeContext.Provider>
  )
}

export default App
