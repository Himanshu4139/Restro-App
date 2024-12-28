import React, { useEffect } from 'react'
import BackButton from '../Components/BackButton'
import { useState } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';


const Createmenu = ({setShowModel, setChange}) => {
    const [itemname, setItemname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [value, setValue] = useState('');
    const [adminData, setAdminData] = useState([]);
    const [cookies] = useCookies(['token']);
    const { id } = jwtDecode(cookies.token);

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`).
        then((res)=>{
          setAdminData(res.data.admin);
        })
        .catch((err)=>{
          console.log(err);
        })
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
          setImage(data.secure_url);
          
      } catch (error) {
          console.error('Error uploading image:', error);
      }
  }

  const submitHandle = async(e)=>{
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_URL}admin/food/addMenu`, {
        name: itemname,
        price: price,
        category: category,
        image: image,
        value: id
    })
    .then(res=>{
      setShowModel(false);
      setChange((prev)=>!prev);
      setItemname('');
      setPrice('');
      setCategory('');
      setImage('');
    })
    .catch(err=>{
        console.log(err);
    })
    
}

    
  return (
    <>
        <div className="flex flex-col rounded-xl w-[90%] p-4 my-10 mx-auto bg-emerald-400 opacity-90">
        <div className="flex items-center">
          <BackButton setShowModel={setShowModel} destination='/admin'/>
          <h1 className="text-xl font-semibold mx-4">Add Menu Item</h1>
        </div>
        <form onSubmit={submitHandle}>
          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Name</label>
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemname(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Title"
            />
          </div>

          <div className="my-3">
            <label className="text-xl text-black mx-2">Item Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              placeholder="Price"
            />
          </div>
          <div className="my-3">
            <label className="text-xl text-black mx-2">Category</label>
            <select
              className="border-2 border-gray-500 px-4 py-[4px] w-full rounded-xl text-lg focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select category</option>
              {adminData.categories && adminData.categories.slice().reverse().map((cat, index) => (
                <option key={index} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>
          <div className="my-3">
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
            Add Item
          </button>
        </form>
      </div>
    </>
  )
}

export default Createmenu