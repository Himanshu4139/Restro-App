import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Footer = ({setShowModel,setShowModel1, setChange}) => {
    const hanldeClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowModel(true);
    }
    const hanldeClick1 = () => {
        setShowModel1(true);
    }

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    

  return (
    <>
        <div className='h-14 w-full fixed bottom-0 border-t-2 border-gray-500 flex justify-between px-2 items-center bg-white'>
            <Link to={'/profile'} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-user text-2xl"></i>
            </Link>
            <div className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center' onClick={() => {
                  hanldeClick1()
                }}>
                <i className="fa fa-qrcode text-3xl"></i>
            </div>
            <div className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center' onClick={() => {
                  hanldeClick()
                }}>
                <i className="fa fa-plus text-3xl"></i>
            </div>
            <Link to={'/order'} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa-solid fa-kitchen-set text-2xl"></i>
            </Link>
            
            <div className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center' onClick={() => {
                    removeCookie('token', { path: '/' });
                    navigate('/');
                }
            }>
                <i className="fa fa-sign-out text-3xl"></i>
            </div>
            
        </div>
    </>
  )
}

export default Footer