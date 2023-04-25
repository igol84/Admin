import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";
import {animated, useSpring} from '@react-spring/web'

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

function App() {
  const [openBar, setOpenBar] = useState(true)
  const toggleOpenBar = () => {
    setOpenBar(prev => !prev)
  }
  const width = 30 + (openBar ? 170 : 0)
  const style = useSpring({
    marginLeft: !openBar ? 80 : 250,
    config: {
      mass: 1, tension: 220, friction: 25
    },
  })
  return (
    <div className='app'>
      <SidebarMenu width={width} toggleOpenBar={toggleOpenBar}/>
      <main className='content'>
        <animated.div style={style}>
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
          </Routes>
        </animated.div>
      </main>
    </div>
  )
}

export default App
