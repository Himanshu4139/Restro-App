import React, { useState } from 'react'
import BackButton from '../Components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const UserLogin = ({setShowModel, id, setShowModel1}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies(['token']);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_URL}user/login`,{
            email,
            password
        })
        .then((res)=>{
            setCookie('token',res.data.token,{path: '/user'});
            setShowModel(false);
            navigate(`/user/${id}`);
            setEmail('');
            setPassword('');
        })
        .catch((err)=>{
            console.log(err);
            
        })
    }

  return (
    <div>
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='h-[40%] w-[75%] border-2 border-gray-600 rounded-md'>
                <div className='flex border-b-2 border-gray-600 h-14 py-2 px-2 items-center mb-2'>
                <BackButton setShowModel={setShowModel} destination={`/user/${id}`}/>
                    <h1 className='text-xl font-semibold mx-3'>Login</h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col px-5 py-3'>
                    <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)} 
                    type="email" 
                    placeholder='Enter your Email' />
                    <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)} 
                    type="password" 
                    placeholder='Enter your Password' />
                    <button type='submit' className='px-2 py-2 text-white bg-emerald-500 rounded-md font-semibold my-2 cursor-pointer'>Login</button>
                </form>
                <p className='text-center'>Don't Have an Account: <span className='text-blue-600 cursor-pointer' onClick={()=>{
                    setShowModel(false);
                    setShowModel1(true);
                }}>SignUp</span></p>
            </div>
        </div>
    </div>
  )
}

export default UserLogin