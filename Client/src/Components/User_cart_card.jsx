import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/slices/CartSlice';
import { FaTrash } from 'react-icons/fa';

const UserCartCard = ({ image, name, price, qty, id }) => {
    
    const dispatch = useDispatch();

    return (
        <div className="flex relative items-center border rounded-lg p-4 shadow-md max-w-2xl mx-auto my-2">
            {/* Delete Icon */}
            <button
                onClick={() => dispatch(removeFromCart({ id }))}
                className="absolute top-3 right-3 text-red-500 hover:transition-colors duration-300 hover:scale-110 active:scale-95"
            >
                <FaTrash size={20} />
            </button>
            {/* Image section */}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* Content section */}
            <div className="ml-4 flex-grow">
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-gray-600">₹{price}</p>

                {/* Quantity controls */}
                <div className="flex items-center mt-2">
                    <button
                        onClick={()=>{
                            dispatch(decreaseQuantity({id}));
                        }}
                        className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{qty}</span>
                    <button
                        onClick={()=>{
                            dispatch(increaseQuantity({id}))
                        }}
                        className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                    >
                        +
                    </button>
                    <span className="ml-4 text-gray-700">
                        Total: ₹ {price*qty}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserCartCard;