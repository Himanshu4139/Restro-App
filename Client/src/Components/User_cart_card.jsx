import React, { useState } from 'react';

const UserCartCard = ({ image, name='Food', price=200, initialQuantity = 1 }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className="flex items-center border rounded-lg p-4 shadow-md max-w-2xl mx-auto my-2">
            {/* Image section */}
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src="https://media.istockphoto.com/id/1625128179/photo/composition-of-well-balanced-food-for-healthy-eating.jpg?s=612x612&w=is&k=20&c=FfjR9w3_gP7hKgj__1KcOkeT41b-D4q7zpHAOfFLeng="
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
                        onClick={decrementQuantity}
                        className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="px-4 py-1 bg-gray-100">{quantity}</span>
                    <button
                        onClick={incrementQuantity}
                        className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                    >
                        +
                    </button>
                    <span className="ml-4 text-gray-700">
                        Total: ₹{(price * quantity).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UserCartCard;