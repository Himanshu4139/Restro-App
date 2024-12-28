import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Admin from './Pages/Admin'
import User from './Pages/User'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import Order from './Pages/Order'
import Home from './Pages/Home'
import User_order from './Pages/User_order'
import User_profile from './Pages/User_profile'

const App = () => {
  const [minus, setMinus] = useState(true)
  const [changes, setChanges] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile setMinus={setMinus} minus={minus}/>} />
        <Route path='/admin' element={<Admin setMinus={setMinus} minus={minus} />} />
        <Route path='/order' element={<Order changes={changes} setChanges={setChanges} />} />
        <Route path='/user/:id' element={<User />} />
        <Route path='/user/cart/:id' element={<Cart setChanges={setChanges} change={changes} />} />
        <Route path='/user/user-order/:id' element={<User_order changes={changes} setChanges={setChanges} />} />
        <Route path='/user/user-profile/:id' element={<User_profile />} />
      </Routes>
    </>
  )
}

export default App
