import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {motion} from "framer-motion"

import SidebarMenu from "./layout/Sidebar"
import TopBar from "./layout/topBar"
import Auth from "./pages/auth"
import Dashboard from "./pages/dashboard"
import Sellers from "./pages/sellers"
import Places from "./pages/places"
import Expenses from "./pages/expenses"
import NewProducts from "./pages/new-products"
import Items from "./pages/items-editor"
import ProductsEditor from "./pages/products-editor"
import NewSale from "./pages/new-sales";
import ReportPage from "./pages/report";

function App() {
  const [openBar, setOpenBar] = useState(true)
  const toggleOpenBar = () => {
    setOpenBar(prev => !prev)
  }

  return (
    <div className='app'>
      <SidebarMenu width={openBar ? 200 : 30} toggleOpenBar={toggleOpenBar}/>
      <main className='content'>
        <motion.div
          layout style={{marginLeft: openBar ? "250px" : "80px"}}
          transition={{bounce: 0, duration: 0.2, ease: 'linear'}}
        >
          <TopBar/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/sellers' element={<Sellers/>}/>
            <Route path='/places' element={<Places/>}/>
            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/new-products' element={<NewProducts/>}/>
            <Route path='/items-editor' element={<Items/>}/>
            <Route path='/products-editor' element={<ProductsEditor/>}/>
            <Route path='/new-sales' element={<NewSale/>}/>
            <Route path='/report' element={<ReportPage/>}/>
          </Routes>
        </motion.div>
      </main>
    </div>
  )
}

export default App
