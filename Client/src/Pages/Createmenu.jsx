import React, { useEffect } from 'react'
import BackButton from '../Components/BackButton'
import { useState } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { FaUtensils, FaDollarSign } from 'react-icons/fa';
import { FiUploadCloud } from 'react-icons/fi';
import toast from 'react-hot-toast';



const Createmenu = ({setShowModel, setChange}) => {
    const [itemname, setItemname] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [value, setValue] = useState('');
    const [adminData, setAdminData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    
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
          toast.success('Image uploaded successfully');
          
      } catch (error) {
          toast.error('Failed to upload image');
          console.error('Error uploading image:', error);
      }
  }
    //edited code 
  const submitHandle = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      await axios.post(`${import.meta.env.VITE_URL}admin/food/addMenu`, {
        name: itemname,
        price: price,
        category: category,
        image: image,
        value: id,
      });
  
      setShowModel(false);
      setChange((prev) => !prev);
      setItemname('');
      setPrice('');
      setCategory('');
      setImage('');
      toast.success('Menu item added successfully!');
    } catch (err) {
      setError(err.message || 'Failed to add menu item');
      toast.error('Failed to add menu item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
    // // Original code
//   const submitHandle = async(e)=>{
//     setLoading(true);
//     setError('');
//     e.preventDefault();
//     await axios.post(`${import.meta.env.VITE_URL}admin/food/addMenu`, {
//         name: itemname,
//         price: price,
//         category: category,
//         image: image,
//         value: id
//     })
//     .then(res=>{
//       setShowModel(false);
//       setChange((prev)=>!prev);
//       setItemname('');
//       setPrice('');
//       setCategory('');
//       setImage('');
//     })
//     .catch(err=>{
//        setError(err.message || 'Failed to add menu item');
//         console.log(err);
//     }
//   )
// }

    
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
        <div className="bg-[#1A1A1A] max-w-md w-full p-4 sm:p-6 rounded-3xl shadow-lg mx-2">
          <BackButton setShowModel={setShowModel} destination="/admin" />
          <div className="flex justify-between items-center border-b pb-3">
            <h1 className="text-xl sm:text-2xl font-semibold text-amber-500">
              Add Menu Item
            </h1>
          </div>
          <form
            className="flex flex-col space-y-4 mt-4"
            onSubmit={submitHandle}
          >
            {/* Item Name */}
            <div className="relative">
              <FaUtensils
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm sm:text-base"
                required
                value={itemname}
                onChange={(e) => setItemname(e.target.value)}
                type="text"
                placeholder="Enter Item Name"
              />
            </div>

            {/* Item Price */}
            <div className="relative">
              <FaDollarSign
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm sm:text-base"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                min="0"
                placeholder="Enter Item Price"
              />
            </div>

            {/* Select Category */}
            <div className="relative">
              {/* <label className="text-sm sm:text-base text-white mx-2">
                
              </label> */}
              <select
                className="w-full pl-3 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm sm:text-base"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled >
                  Select category
                </option>
                {adminData.categories &&
                  adminData.categories
                    .slice()
                    .reverse()
                    .map((cat, index) => (
                      <option key={index} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="relative">
              <label
                htmlFor="fileUpload"
                className="text-amber-500 text-xs sm:text-sm"
              >
                Upload Item Image
              </label>
              <label
                htmlFor="fileUpload"
                className="flex items-center gap-2 border border-gray-600 rounded-lg py-2 px-3 cursor-pointer"
              >
                <FiUploadCloud className="text-gray-500" size={20} />
                <span className="text-white text-sm sm:text-base">
                  Choose File
                </span>
              </label>
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
            {loading && (
              <p className="text-white text-center text-sm sm:text-base">
                Uploading...
              </p>
            )}
        
            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-center text-sm sm:text-base">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 sm:py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300 text-sm sm:text-base"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Item"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Createmenu;