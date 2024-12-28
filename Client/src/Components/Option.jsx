import React from 'react'
import { FaMinus } from 'react-icons/fa'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'


const Option = ({change, setSelectedCategory, minus}) => {

  const [category, setCategory] = useState([]);
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const { id } = jwtDecode(cookies.token);
    axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
      .then((response) => {
        setCategory(response.data.admin.categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
    } , [change]);

  const handleDelete = async (categoryId) => {
    try {
      const { id } = jwtDecode(cookies.token);
      const response = await axios.delete(`${import.meta.env.VITE_URL}admin/food/deleteCategory/${categoryId}`, {
        params: { value: id },
      });
      setCategory(category.filter((item) => item._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };


  return (
    <>
      {category.slice().reverse().map((item,index) => (
        <div key={index} className='relative flex flex-col items-center cursor-pointer my-2'>
          <div className='relative'>
            <img className='h-14 w-14 rounded-full border-2 border-gray-300 object-cover' src={item.categoryImage} alt={item.categoryName} onClick={()=> handleCategoryClick(item.categoryName)}/>
          </div>
          {minus ? <FaMinus className='absolute top-0 right-0 text-black bg-gray-200 rounded-full p-1' onClick={()=>{
            handleDelete(item._id)
          }}/> : ""}
          
          <p className='text-center'>{item.categoryName}</p>
        </div>
      ))}
    </>
  )
}

export default Option