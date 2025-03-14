import React, { useState, useEffect } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import Model from './Model';
import Updatemenu from '../Pages/Updatemenu';
import { useCookies } from 'react-cookie';


const Card = ({change,setChange,category}) => {
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
    }, [change]);

    const handleDelete = async (itemId) => {
    try {
      const { id } = jwtDecode(cookies.token);
      const response = await axios.delete(`${import.meta.env.VITE_URL}admin/food/deleteMenu/${itemId}`, {
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
              <MdOutlineModeEditOutline className="text-2xl mx-2" onClick={()=>{
                setCardId(item._id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowModel(true);
              }} />
              <FaTrashAlt className="text-2xl mx-1" onClick={()=>{
                handleDelete(item._id)
              }} />
            </div>
          </div>
        </div>
      ))}

      {showModel && model}
    </>
  );
};

export default Card;
