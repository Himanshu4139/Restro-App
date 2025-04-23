import React, { useState } from 'react';
import BackButton from '../Components/BackButton';
import { FaRegEnvelope,FaShopify } from "react-icons/fa6";
import { FiLock} from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { VscEyeClosed,VscEye} from "react-icons/vsc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Signup = ({ setShowModel, setShowModel1 }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [shop, setShop] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
   const [showPassword, setShowPassword] = useState(false);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#1A1A1A] max-w-md w-full p-6 rounded-3xl shadow-lg">
                <div className="flex items-center border-b  pb-3">
                    <BackButton setShowModel={setShowModel} destination="/" />
                    <h1 className="text-2xl font-semibold mx-3 text-amber-500">Admin SignUp</h1>
                </div>
                <form onSubmit={submitHandle} className="flex flex-col space-y-4 mt-4">
                    <div className="relative">
                        <FaRegEnvelope className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter your Email"
                        />
                    </div>
                    <div className="relative">
                        <FiLock className="absolute left-3 top-3 text-gray-500" size={20} />
                        <input
                            className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your Password"
                        />
                         <button
                             type="button"
                             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                             onClick={() => setShowPassword(!showPassword)}
                            >
                             {showPassword ? <VscEyeClosed  size={16} /> : <VscEye  size={16} />}
                          </button>
                    </div>
                    <div className="relative">
                        <BsTelephone  className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="number"
                            placeholder="Enter your Mobile Number"
                        />
                    </div>
                    <div className="relative">
                        <FaShopify  className="absolute left-3 top-3 text-gray-500" size={22} />
                        <input
                            className="w-full pl-10 pr-3 py-2 sm:py-3 bg-white/[0.03] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            required
                            value={shop}
                            onChange={(e) => setShop(e.target.value)}
                            type="text"
                            placeholder="Enter your Shop Name"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 sm:py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition duration-300"
                    >
                       Pay ₹99 For SignUp
                    </button>
                </form>
                <p className="text-center text-amber-500 mt-3 ">
                    Already Have an Account?{" "}
                    <span
                        className="text-blue-600 cursor-pointer font-bold"
                        onClick={() => {
                            setShowModel(false);
                            setShowModel1(true);
                        }}
                    >
                        LogIn
                    </span>
                </p>
            </div>
        </div>
  );
};

export default Signup;
