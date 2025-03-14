import React from 'react';
import User_header from '../Components/User_header';
import UserCartCard from '../Components/User_cart_card';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { clearCart } from '../redux/slices/CartSlice';
import { useCookies } from 'react-cookie';
import { toggleChanges } from '../redux/slices/changesSlice';

const Cart = () => {

    const dispatch = useDispatch();

    const cartItem = useSelector((state) => state.cart.cart);

    const totalItem = cartItem.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

    const { id } = useParams();
    const navigate = useNavigate();

    const [cookies] = useCookies(['token']);
    const decode = jwtDecode(cookies.token);

    // Handle payment order
    const handleClick1 = async () => {
        try {
            if (cartItem.length === 0) {
                console.log('Cart is empty');
                return;
            }

            // Creating order in Razorpay
            const orderResponse = await axios.post(`${import.meta.env.VITE_URL}payment/orderPayment`, { amount: totalPrice }); // Convert to paise
            const orderId = orderResponse.data.response.id;

            const options = {
                key: import.meta.env.VITE_KEY,
                amount: totalPrice * 100, // Amount in paise
                currency: 'INR',
                name: 'Restro',
                description: 'Test Transaction',
                image: 'https://example.com/your_logo',
                order_id: orderId,
                handler: async function (response) {
                    await handlePaymentSuccess(response);
                },
                prefill: {
                    name: 'Gaurav Kumar',
                    email: 'gaurav.kumar@example.com',
                    contact: '9000090000'
                },
                notes: {
                    address: 'Razorpay Corporate Office'
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const rzp1 = new Razorpay(options);

            rzp1.on('payment.failed', (error) => {
                alert(`Payment failed: ${error.error.description}`);
            });

            // Open Razorpay modal
            rzp1.open();

        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    // Handle payment success and create order
    const handlePaymentSuccess = async (response) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

            // Step 3: Validate the payment with the server
            const paymentValidationResponse = await axios.post(`${import.meta.env.VITE_URL}payment/orderValidate`, {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            if (paymentValidationResponse.status === 200) {
                // Step 4: Register the order in the system
                await createOrder();
            } else {
                console.log('Payment validation failed');
            }
        } catch (err) {
            console.error('Payment validation or order creation failed:', err);
        }
    };

    // Create order in the backend
    const createOrder = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}admin/food/addOrder`, {
                orderItems: cartItem,
                orderPrice: totalPrice,
                status: 'inprocess',
                userId: decode._id,
                value: id
            });

            // Dispatch actions to clear cart and toggle changes
            dispatch(clearCart());
            dispatch(toggleChanges());

            // Navigate to user orders page
            navigate(`/user/user-order/${id}`);
        } catch (err) {
            console.error('Error creating order:', err);
        }
    };

    return (
        <>
            <User_header id={id} />
            <div className="flex-grow overflow-y-auto pb-44">
                {cartItem.length !== 0 ? cartItem.slice().reverse().map((item, index) => (
                    <UserCartCard key={index} image={item.image} name={item.name} price={item.price} qty={item.quantity} id={item.id} />
                )) : <p className='text-center font-semibold py-3'>Your Cart Is Empty..</p>}
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
                <button className='w-full px-3 py-3 bg-emerald-400 text-xl font-semibold rounded-md mb-2' onClick={handleClick1}>
                    Pay Now ₹ {totalPrice}
                </button>
            </div>
        </>
    );
};

export default Cart;
