import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import LanguageProvider from "./components/LanguageProvider";
import ThemeProvider from "./components/ThemeProvider";
import {ProSidebarProvider} from "react-pro-sidebar";
import {CssBaseline} from "@mui/material";
import './index.css'
import App from './App'
import {setupStore} from "./store";

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <ProSidebarProvider>
          <Provider store={store}>
            <BrowserRouter>
              <CssBaseline/>
              <App/>
            </BrowserRouter>
          </Provider>
        </ProSidebarProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
