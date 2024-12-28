import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const User_header = ({id}) => {

  const [shop, setShop] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
    .then((res)=>{
      setShop(res.data.admin.shopName);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [id])
  

  return (
    <>
        <div className='flex justify-between px-5 items-center bg-emerald-500 w-full h-14 border-b-2 border-black'>
            <h3 className='text-2xl font-semibold italic font-serif'>{shop}</h3>
            <Link to={`/user/${id}`} className='flex justify-center items-center'>
                <i className="fa fa-home text-3xl"></i>
            </Link>
        </div>
    </>
  )
}

export default User_header