import React from 'react'
import BackButton from '../Components/BackButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';


const Createcategory = ({setShowModel, setChange}) => {

    const [categoryName, setCategoryName] = useState('');
    const [file, setFile] = useState('');
    const [value, setValue] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        setValue(decoded.id);
    },[])

    async function handleUpload(e){
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

    const submitHandle = async(e)=>{
        e.preventDefault();
        await axios.post('http://localhost:5000/admin/food/addCategory', {
            name: categoryName,
            image: file,
            value: value
        })
        .then(res=>{
            setShowModel(false);
            setChange((prev)=>!prev);
            setCategoryName('');
            setFile('');
        })
        .catch((err)=>{
            console.log(err);
        })
        
    }

  return (
    <div>
        <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-emerald-400 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel} destination='/admin'/>
          <h1 className="text-xl font-semibold mx-4">Add Menu Item</h1>
        </div>
        <form onSubmit={submitHandle}>
          <div className="my-3">
            <label className="text-xl text-black mx-2">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Title"
            />
            <label className="text-xl text-black mx-2">Item Image</label>
            <input
              type="file"
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              onChange={handleUpload}
            />
          </div>

          <button
            type="submit"
            className='p-2 bg-zinc-600 w-full my-5 rounded-2xl text-xl font-semibold text-white hover:bg-zinc-700'
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default Createcategory