import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/CartSlice';

const User_card = ({ id, category }) => {
    const [menu, setMenu] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
            .then((response) => {
                setMenu(response.data.admin.menu);
            })
            .catch((error) => {
                console.error('Error fetching menu items:', error);
            });
    }, [id]);

    const filteredItems =
        category === 'All'
            ? menu
            : menu.filter(item => item.itemCategory === category);

    return (
        <>
            {filteredItems && filteredItems.slice().reverse().map((item, index) => (
                <div key={index} className='w-full h-auto flex flex-col justify-center items-center border-b-2 border-gray-500'>
                    <img src={item.image} alt={item.itemName} className='border-b-2 border-gray-400' />
                    <div className='flex justify-between items-center py-3 px-3 w-full'>
                        <div className='flex flex-col items-start'>
                            <h1 className='text-xl'>₹ {item.itemPrice}</h1>
                            <h1 className='text-xl'>{item.itemName}</h1>
                        </div>
                        <div className='flex flex-col'>

                            <button className='bg-amber-400 py-2 px-4 font-semibold rounded-md cursor-pointer text-black transition-transform duration-200 hover:bg-emerald-500 active:scale-95 shadow-md' onClick={()=>{
                                dispatch(addToCart({
                                    id: item._id, 
                                    name: item.itemName, 
                                    price: item.itemPrice, 
                                    image: item.image, 
                                }))
                            }}>ADD CART</button>

                        </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default User_card