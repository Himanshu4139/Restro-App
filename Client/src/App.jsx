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
import AdminAuth from './Auth/AdminAuth'
import Auth from './Auth/Auth'
import UserAuth from './Auth/UserAuth'

const App = () => {
  const [minus, setMinus] = useState(true)
  const [changes, setChanges] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<AdminAuth><Profile setMinus={setMinus} minus={minus}/></AdminAuth>} />
        <Route path='/admin' element={<AdminAuth><Admin setMinus={setMinus} minus={minus} /></AdminAuth>} />
        <Route path='/order' element={<AdminAuth><Order changes={changes} setChanges={setChanges} /></AdminAuth>} />
        <Route path='/user/:id' element={<Auth><User /></Auth>} />
        <Route path='/user/cart/:id' element={<UserAuth><Cart setChanges={setChanges} change={changes} /></UserAuth>} />
        <Route path='/user/user-order/:id' element={<UserAuth><User_order changes={changes} setChanges={setChanges} /></UserAuth>} />
        <Route path='/user/user-profile/:id' element={<UserAuth><User_profile /></UserAuth>} />
      </Routes>
    </>
  )
}

export default App
