import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const User_footer = ({id, setShowModel, showModel}) => {
    const cartItem = useSelector((state)=> state.cart.cart);
    

    const navigate = useNavigate();
    const handleProfile = async()=>{
        const token = localStorage.getItem('token');
        if(!token){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
            return;    
        }
        const decode = jwtDecode(token);
        console.log(decode._id);
        
        await axios.get(`http://localhost:5000/user/profile/${decode._id}`)
        .then((res)=>{
            if(res.status==200){
                navigate(`/user-profile/${id}`);
            }
            else{
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowModel(true)
            }
        })
        .catch((err)=>{
            console.log(err);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
        })
    }

    const handleCart = async()=>{
        const token = localStorage.getItem('token');
        if(!token){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
            return;    
        }
        const decode = jwtDecode(token);
        console.log(decode._id);
        
        await axios.get(`http://localhost:5000/user/profile/${decode._id}`)
        .then((res)=>{
            if(res.status==200){
                navigate(`/cart/${id}`);
            }
            else{
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowModel(true)
            }
        })
        .catch((err)=>{
            console.log(err);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
        })
    }
    
    const handleOrder = async()=>{
        const token = localStorage.getItem('token');
        if(!token){
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
            return;    
        }
        const decode = jwtDecode(token);
        console.log(decode._id);
        
        await axios.get(`http://localhost:5000/user/profile/${decode._id}`)
        .then((res)=>{
            if(res.status==200){
                navigate(`/user-order/${id}`);
            }
            else{
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowModel(true)
            }
        })
        .catch((err)=>{
            console.log(err);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setShowModel(true)
        })
    }

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate(`/`);
    }

  return (
    <>
        <div className='h-14 w-full fixed bottom-0 border-t-2 border-gray-500 flex justify-between px-2 items-center bg-white'>
            <div onClick={handleProfile} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-user text-2xl"></i>
            </div>
            <div onClick={handleCart} className='h-12 w-12 relative rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-cart-shopping text-2xl"></i>
                {cartItem.length == 0 ? "" : <p className='absolute left-9 bottom-6 w-6 h-6 rounded-full bg-red-500 px-1 text-center'>{cartItem.length}</p>}
            </div>
            <div onClick={handleOrder} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa-solid fa-kitchen-set text-2xl"></i>
            </div>
            
            <div onClick={handleLogout} className='h-12 w-12 rounded-full border-2 border-gray-500 flex justify-center items-center'>
                <i className="fa fa-sign-out text-2xl"></i>
            </div>
            
        </div>
    </>
  )
}

export default User_footer