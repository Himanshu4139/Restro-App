import React from 'react';
import User_header from '../Components/User_header';
import Model from '../Components/Model';
import Payment from '../Components/Payment';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserCartCard from '../Components/User_cart_card';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { clearCart } from '../redux/slices/CartSlice';
import { useCookies } from 'react-cookie';


const Cart = ({setChanges, changes}) => {

    const dispatch = useDispatch();

    const cartItem = useSelector((state)=> state.cart.cart);

    const totalItem = cartItem.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const totalPrice = cartItem.reduce((total, item)=> {
        return total + item.price*item.quantity;
    },0);

    const {id} = useParams();
    const navigate = useNavigate();

    
    const [cookies] = useCookies(['token']);
    const decode = jwtDecode(cookies.token);
    

    const handleClick1 = async () => {
        try {
            if(cartItem.length == 0){
                console.log('cart is empty');
                return;
                
            }
            
            const res = await axios.post(`${import.meta.env.VITE_URL}admin/food/addOrder`, {
                orderItems: cartItem,
                orderPrice: totalPrice,
                status: 'inprocess',
                userId:decode._id,
                value:id
            });
            dispatch(clearCart());
            setChanges(prevChange => !prevChange); 
            navigate(`/user/user-order/${id}`);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <>
            <User_header id={id}/>
            <div className="flex-grow overflow-y-auto pb-44">
                {cartItem.length != 0 ? cartItem.slice().reverse().map((item,index)=>(
                    <UserCartCard key={index} image={item.image} name={item.name} price={item.price} qty={item.quantity} id={item.id} />
                )): <p className='text-center font-semibold py-3'>Your Cart Is Empty..</p>}
            </div>
            <div className='flex flex-col fixed bottom-0 w-full bg-white border-gray-500 border-t-2'>
                <div className='flex flex-col text-xl px-4 py-6 mb-2'>
                    <div className='flex justify-between mb-2'>
                        <p>Total Items</p>
                        <p>{totalItem}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Total Price</p>
                        <p>₹ {totalPrice}</p>
                    </div>
                    
                </div>
                <button className='w-full px-3 py-3 bg-emerald-400 text-xl font-semibold rounded-md mb-2' onClick={()=>{
                    handleClick1();
                }}>Pay Now ₹ {totalPrice}</button>
            </div>
        </>
    );
};

export default Cart;