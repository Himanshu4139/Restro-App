import React, { useState, useEffect } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Model from './Model';
import Updatemenu from '../Pages/Updatemenu';
import { useCookies } from 'react-cookie';

const Card = ({change, setChange, category}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [cardId, setCardId] = useState('');
  const [cookies] = useCookies(['token']);

  const handleClose = () => {
    setShowModel(false);
  }

  useEffect(() => {
    const { id } = jwtDecode(cookies.token);
    axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
      .then((response) => {
        setMenuItems(response.data.admin.menu);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });
  }, [change, cookies.token]);

  const handleDelete = async (itemId) => {
    try {
      const { id } = jwtDecode(cookies.token);
      await axios.delete(`${import.meta.env.VITE_URL}admin/food/deleteMenu/${itemId}`, {
        params: { value: id },
      });
      setMenuItems(menuItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  }

  const model = <Model onClose={handleClose}>
    <Updatemenu setShowModel={setShowModel} setChange={setChange} itemId={cardId} />
  </Model>

  const filteredItems = 
    category === 'All' 
      ? menuItems 
      : menuItems.filter(item => item.itemCategory === category);

  return (
    <>
      {/* Mobile View (unchanged) */}
      <div className="md:hidden">
        {filteredItems && filteredItems.slice().reverse().map((item,index) => (
          <div
            key={index}
            className="w-full h-auto flex flex-col justify-center items-center border-b-2 border-gray-500"
          >
            <img
              src={item.image}
              alt={item.itemName}
              className="border-b-2 border-gray-400"
            />
            <div className="flex justify-between items-center py-2 px-3 w-full">
              <div className="flex flex-col items-start">
                <h1 className="text-xl">₹ {item.itemPrice}</h1>
                <h1 className="text-xl">{item.itemName}</h1>
              </div>
              <div className="flex px-3">
                <MdOutlineModeEditOutline 
                  className="text-2xl mx-2" 
                  onClick={() => {
                    setCardId(item._id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setShowModel(true);
                  }} 
                />
                <FaTrashAlt 
                  className="text-2xl mx-1" 
                  onClick={() => handleDelete(item._id)} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (new layout) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredItems && filteredItems.slice().reverse().map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.itemName}
                className="w-full h-48 object-cover"
              />
              {/* Offer badge - customize as needed */}
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                60% OFF
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{item.itemName}</h2>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1 text-gray-700">4.4</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-700">30-35 mins</span>
                  </div>
                  <p className="text-gray-500 mt-2 text-sm">
                    {item.itemCategory || 'North Indian, Chinese, Desserts'}
                  </p>
                  <p className="text-gray-500 text-sm">Mahanoqar</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="text-xl font-bold">₹{item.itemPrice}</span>
                  <div className="flex mt-2">
                    <MdOutlineModeEditOutline 
                      className="text-xl mx-1 text-blue-500 cursor-pointer hover:text-blue-700" 
                      onClick={() => {
                        setCardId(item._id);
                        setShowModel(true);
                      }} 
                    />
                    <FaTrashAlt 
                      className="text-xl mx-1 text-red-500 cursor-pointer hover:text-red-700" 
                      onClick={() => handleDelete(item._id)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModel && model}
    </>
  );
};

export default Card;