import React, { useState, useEffect } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Model from './Model';
import Updatemenu from '../Pages/Updatemenu';
import { useCookies } from 'react-cookie';

const Card1 = ({ change, setChange, category,searchTerm = ''}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [cardId, setCardId] = useState('');
  const [cookies] = useCookies(['token']);

  const handleClose = () => setShowModel(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const { id } = jwtDecode(cookies.token);
        const response = await axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`);
        setMenuItems(response.data.admin.menu);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, [change, cookies.token]);

  const handleDelete = async (itemId) => {
    try {
      const { id } = jwtDecode(cookies.token);
      await axios.delete(`${import.meta.env.VITE_URL}admin/food/deleteMenu/${itemId}`, {
        params: { value: id },
      });
      setMenuItems(prev => prev.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

    const filteredItems = (category === 'All' 
      ? [...menuItems] 
      : menuItems.filter(item => item.itemCategory === category))
      .filter(item => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
          item.itemName.toLowerCase().includes(searchLower) ||
          (item.itemDescription?.toLowerCase().includes(searchLower))
        );
      })
      .reverse();

  return (
    <>
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col border border-gray-700"
          >
            {/* Image Section with Edit Button */}
            <div className="relative h-44 w-full ">
              <img
                src={item.image}
                alt={item.itemName}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Edit Button - top right on image */}
              <button
                onClick={() => {
                  setCardId(item._id);
                  setShowModel(true);
                }}
                className="absolute top-0 right-0 p-2 bg-blue-500 hover:bg-blue-600 text-gray-800 rounded-full transition-all flex items-center shadow-md"
                aria-label="Edit item"
              >
                <MdOutlineModeEditOutline className="w-4 h-4" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4 flex-grow flex flex-col">
              {/* Product Name - centered */}
              <h2 className="text-base font-semibold text-gray-200 line-clamp-1 text-center mb-2">
                {item.itemName}
              </h2>

              {/* Price and Category Row */}
              <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-400 text-xs">
                  {item.itemCategory}
                </p>
                <span className="text-sm font-bold text-green-400">
                 Price: ₹{item.itemPrice}
                </span>
              </div>

              {/* Delete Button - bottom right */}
              <div className="mt-3 flex justify-end">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors flex items-center border border-red-500/20"
                  aria-label="Delete item"
                >
                  <FaTrashAlt className="w-3.5 h-3.5 mr-1.5" />
                  <span className="text-xs">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {showModel && (
        <Model onClose={handleClose}>
          <Updatemenu
            setShowModel={setShowModel}
            setChange={setChange}
            itemId={cardId}
          />
        </Model>
      )}
    </>
  );
};

export default Card1;