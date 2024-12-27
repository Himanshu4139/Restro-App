import React from 'react';
import User_header from '../Components/User_header';
import Model from '../Components/Model';
import Payment from '../Components/Payment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserCartCard from '../Components/User_cart_card';
import { useSelector } from 'react-redux';


const Cart = () => {
    const [showModel2, setShowModel2] = useState(false);

    const cartItem = useSelector((state)=> state.cart.cart);

    const totalItem = cartItem.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    const totalPrice = cartItem.reduce((total, item)=> {
        return total + item.price*item.quantity;
    },0);
    

    const handleClick2 = () => {
        setShowModel2(true);
    }
    const handleClose2 = () => {
        setShowModel2(false);
    }
    const model2 = <Model onClose={handleClose2}>
        <Payment setShowModel2={setShowModel2} />
    </Model>

    const {id} = useParams();

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
                    handleClick2();
                }}>Pay Now ₹ {totalPrice}</button>
            </div>
            {showModel2 && model2}
        </>
    );
};

export default Cart;