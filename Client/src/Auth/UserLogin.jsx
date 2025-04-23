import React, { useState } from 'react'
import BackButton from '../Components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FaRegEnvelope } from "react-icons/fa6";
import { FiLock } from "react-icons/fi";
import { VscEyeClosed,VscEye} from "react-icons/vsc";

const UserLogin = ({setShowModel, id, setShowModel1}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cookies, setCookie] = useCookies(['token']);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const submitHandle = async(e)=>{
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
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-[#1A1A1A] max-w-md w-full p-6 rounded-3xl shadow-lg'>
                <div className='flex items-center border-b pb-3'>
                    <BackButton setShowModel={setShowModel} destination={`/user/${id}`} />
                    <h1 className='text-2xl font-semibold text-amber-500 mx-3'>User Login</h1>
                </div>
                <form onSubmit={submitHandle} className='flex flex-col space-y-3 mt-4'>
                    <div className='relative'>
                    <FaRegEnvelope className="absolute left-3 top-4 text-gray-500" size={20} />
                    <input
                        className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder='Enter your Email'
                    />
                    </div>
                    <div className='relative'>
                     <FiLock    className="absolute left-3 top-4 text-gray-500" size={20} />
                    <input
                        className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter your Password'
                    />
                    <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VscEyeClosed  size={16} /> : <VscEye  size={16} />}
            </button>
                    </div>
                    <button
                        type='submit'
                         className="w-full py-2 sm:py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className='text-center mt-3 text-amber-500'>
                    Don't Have an Account?{' '}
                    <span
                        className='text-blue-600 cursor-pointer font-bold'
                        onClick={() => {
                            setShowModel(false);
                            setShowModel1(true);
                        }}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default UserLogin;