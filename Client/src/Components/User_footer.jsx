import React from 'react'
import { Link } from 'react-router-dom'

const User_footer = ({id}) => {
  return (
    <>
        <div className='h-14 w-full fixed bottom-0 border-t-2 border-gray-500 flex justify-between px-2 items-center bg-white'>
            <Link to={`/user-profile/${id}`} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-user text-2xl"></i>
            </Link>
            <Link to={`/cart/${id}`} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-cart-shopping text-2xl"></i>
            </Link>
            <Link to={`/user-order/${id}`} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa-solid fa-kitchen-set text-2xl"></i>
            </Link>
            
            <Link to={`/`} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-sign-out text-2xl"></i>
            </Link>
            
        </div>
    </>
  )
}

export default User_footer