import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useState } from 'react'


const Header = () => {

  const [shop, setShop] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      axios.get(`http://localhost:5000/admin/profile/${user.id}`)
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