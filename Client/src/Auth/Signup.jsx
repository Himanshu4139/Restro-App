import React, { useContext, useState } from 'react'
import BackButton from '../Components/BackButton'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Signup = ({ setShowModel, setShowModel1 }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState('')
    const [shop, setShop] = useState('')
    const [file, setFile] = useState('')

    const navigate = useNavigate();


    async function handleUpload(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUD_NAME);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setFile(data.secure_url);

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const submitHandle = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/admin/register', {
            email: email,
            password: password,
            phoneNo: number,
            shopName: shop,
            image: file
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                navigate('/admin');
                setEmail('');
                setPassword('');
                setNumber('');
                setShop('');
                setFile('');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>

            <div className='h-screen w-screen flex justify-center items-center'>
                <div className='h-[70%] w-[75%] border-2 border-gray-600 rounded-md'>
                    <div className='flex border-b-2 border-gray-600 h-14 py-2 px-2 items-center mb-2'>
                        <BackButton setShowModel={setShowModel} destination='/' />
                        <h1 className='text-xl font-semibold mx-3'>SignUp</h1>
                    </div>
                    <form onSubmit={submitHandle} className='flex flex-col px-5 py-3'>
                        <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Enter your Email' />
                        <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Enter your Password' />
                        <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="number"
                            placeholder='Enter your Mobile Number' />
                        <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                            value={shop}
                            onChange={(e) => setShop(e.target.value)}
                            type="text"
                            placeholder='Enter your Shop Name' />
                        <label className='text-black'>Upload your Shop QR Image</label>
                        <input className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
                            onChange={handleUpload}
                            type="file"
                            placeholder='Upload your QR Image'
                        />
                        <button type='submit' className='px-2 py-2 text-white bg-emerald-500 rounded-md font-semibold my-2 cursor-pointer'>SignUp</button>
                    </form>
                    <p className='text-center'>Already Have an Account: <span className='text-blue-600 cursor-pointer' onClick={() => {
                        setShowModel(false);
                        setShowModel1(true);
                    }}>LogIn</span></p>
                </div>
            </div>
        </>
    )
}

export default Signup