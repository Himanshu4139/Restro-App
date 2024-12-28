import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useState } from 'react'
import { useCookies } from 'react-cookie'


const Header = () => {

  const [shop, setShop] = useState('');
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    
    if (cookies.token) {
      const { id } = jwtDecode(cookies.token);
      axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
      .then(res=>{
        setShop(res.data.admin.shopName);
      })
      .catch(err=>{
        console.log(err);
      })

    }}
  , []);
  

  return (
    <>
        <div className='flex justify-between px-5 items-center bg-emerald-500 w-full h-14 border-b-2 border-black'>
            <h3 className='text-2xl font-semibold italic font-serif'>{shop}</h3>
            <Link to={'/admin'} className='flex justify-center items-center'>
                <i className="fa fa-home text-3xl"></i>
            </Link>
        </div>
    </>
  )
}

export default Header