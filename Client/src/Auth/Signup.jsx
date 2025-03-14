import React, { useState } from 'react';
import BackButton from '../Components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Signup = ({ setShowModel, setShowModel1 }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [shop, setShop] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  // Handle Razorpay payment submission
  const submitHandle = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Step 1: Create an order with Razorpay
      const orderResponse = await axios.post(`${import.meta.env.VITE_URL}payment/orderPayment`, { amount: 99 });
      const orderId = orderResponse.data.response.id;

      // Step 2: Set up Razorpay options
      const options = {
        key: import.meta.env.VITE_KEY,
        amount: '99', // In paise
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

      // Create the Razorpay instance
      const rzp1 = new Razorpay(options);

      // Handle Razorpay payment failed event
      rzp1.on('payment.failed', (error) => {
        alert(`Payment failed: ${error.error.description}`);
      });

      // Open Razorpay modal
      rzp1.open();

    } catch (err) {
      console.error('Error creating payment order:', err);
    }
  };

  // Handle successful payment validation and user registration
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
        // Step 4: Register the user if payment is valid
        await registerUser();
      } else {
        console.log('Payment validation failed');
      }
    } catch (err) {
      console.error('Payment validation or user registration failed:', err);
    }
  };

  // Handle user registration after payment validation
  const registerUser = async () => {
    try {
      const registerResponse = await axios.post(`${import.meta.env.VITE_URL}admin/register`, {
        email,
        password,
        phoneNo: number,
        shopName: shop
      });

      // Step 5: Save token in cookies and navigate to admin page
      setCookie('token', registerResponse.data.token, { path: '/' });
      navigate('/admin');

      // Clear form fields after successful registration
      resetForm();
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  // Reset the form fields after successful registration
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setNumber('');
    setShop('');
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='h-[70%] w-[75%] border-2 border-gray-600 rounded-md'>
        <div className='flex border-b-2 border-gray-600 h-14 py-2 px-2 items-center mb-2'>
          <BackButton setShowModel={setShowModel} destination='/' />
          <h1 className='text-xl font-semibold mx-3'>SignUp</h1>
        </div>
        <form onSubmit={submitHandle} className='flex flex-col px-5 py-3'>
          <input
            className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='Enter your Email'
          />
          <input
            className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            placeholder='Enter your Password'
          />
          <input
            className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            type='number'
            placeholder='Enter your Mobile Number'
          />
          <input
            className='px-2 py-2 text-black border-2 border-gray-600 rounded-md my-2 outline-none'
            value={shop}
            onChange={(e) => setShop(e.target.value)}
            type='text'
            placeholder='Enter your Shop Name'
          />
          <button
            type='submit'
            className='px-2 py-2 text-white bg-emerald-500 rounded-md font-semibold my-2 cursor-pointer'
          >
            Pay ₹99 For SignUp
          </button>
        </form>
        <p className='text-center'>
          Already Have an Account: <span className='text-blue-600 cursor-pointer' onClick={() => {
            setShowModel(false);
            setShowModel1(true);
          }}>LogIn</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
