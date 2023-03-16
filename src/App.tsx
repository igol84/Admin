import React from "react";
import {Route, Routes} from "react-router-dom";

import SidebarMenu from "./layout/Sidebar";
import TopBar from "./layout/topBar";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Sellers from "./pages/sellers";
import Places from "./pages/places";
import Expenses from "./pages/expenses";
import NewProducts from "./pages/new-products";
import Items from "./pages/items-editor";

function App() {
  return (
    <div className='app'>
      <SidebarMenu/>
      <main className='content'>
        <TopBar/>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/sellers' element={<Sellers/>}/>
          <Route path='/places' element={<Places/>}/>
          <Route path='/expenses' element={<Expenses/>}/>
          <Route path='/new-products' element={<NewProducts/>}/>
          <Route path='/items-editor' element={<Items/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
