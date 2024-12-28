import React, { useEffect, useState } from 'react'
import axios from 'axios'

const User_option = ({ id, setSelectedCategory }) => {

    const [cat, setcat] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
            .then((res) => {
                setcat(res.data.admin.categories);
            })
            .catch((err) => {
                console.log(err);

            })
    }, [id])

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
      };


    return (
        <>
            {cat.slice().reverse().map((item, index) => (
                <div key={index} className='flex flex-col items-center cursor-pointer my-2' onClick={()=> handleCategoryClick(item.categoryName)}>
                    <img className='h-14 w-14 rounded-full border-2 border-gray-300 object-cover' src={item.categoryImage} alt={item.categoryName} />
                    <p className='text-center'>{item.categoryName}</p>
                </div>
            ))}

        </>
    )
}

export default User_option