import React from 'react'
import BackButton from '../Components/BackButton'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { FiUploadCloud } from "react-icons/fi";
import toast from 'react-hot-toast';



const Createcategory = ({setShowModel, setChange}) => {

    const [categoryName, setCategoryName] = useState('');
    const [file, setFile] = useState('');
    const [value, setValue] = useState('');

    const [cookies] = useCookies(['token']);
    const { id } = jwtDecode(cookies.token);

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
          toast.success('Image uploaded successfully');
          console.log(data.secure_url);
          
          
      } catch (error) {
          toast.error('Failed to upload image');
          console.error('Error uploading image:', error);
      }
  }

    const submitHandle = async(e)=>{
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_URL}admin/food/addCategory`, {
            name: categoryName,
            image: file,
            value: id
        })
        .then(res=>{
            setShowModel(false);
            setChange((prev)=>!prev);
            setCategoryName('');
            setFile('');
            toast.success('Category added successfully');
        })
        .catch((err)=>{
            toast.error('Failed to add category');
            console.log(err);
        })
        
    }

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
  <div 
    className="bg-[#1A1A1A] w-full max-w-md p-6 rounded-3xl shadow-lg"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="flex justify-between items-center border-b border-gray-600 pb-3">
      <h1 className="text-xl md:text-2xl font-semibold text-amber-500">Add Category</h1>
      <BackButton setShowModel={setShowModel} destination="/admin" />
    </div>
    
    <form onSubmit={submitHandle} className="flex flex-col space-y-4 mt-4">
      <div>
        <label className="block text-base md:text-lg font-medium text-amber-500 mb-2">
          Enter Category Name
        </label>
        <input
          className="w-full px-4 py-2 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          required
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          type="text"
          placeholder="Enter Category Name"
        />
      </div>
      
      <div>
        <label className="block text-sm md:text-base text-amber-500 mb-2">
          Upload Item Image
        </label>
        <div className="relative border border-gray-600 rounded-lg p-3 cursor-pointer flex items-center justify-center text-white">
          <FiUploadCloud className="text-gray-500" size={20} md:size={25} />
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer text-white"
            onChange={handleUpload}
          />
        </div>
        {/* {image && <p className="text-white text-center text-sm md:text-base mt-1">{image.name}</p>} */}
      </div>
      
      <button
        type="submit"
        className="w-full py-2 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300 text-base md:text-lg"
        onClick={handleUpload}
      >
        Save Category
      </button>
    </form>
  </div>
</div>
    </div>
  );
}

export default Createcategory