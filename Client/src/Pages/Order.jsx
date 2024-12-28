import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

const Order = ({changes, setChanges}) => {
    const [activeTab, setActiveTab] = useState('inProcess');
    const [order, setOrder] = useState([]);
    const [cookies] = useCookies(['token']);
    const { id } = jwtDecode(cookies.token);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
            .then((res) => {
                setOrder(res.data.admin.orders);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id,changes])

    const findNo = order.filter((item) => item.status === 'inprocess');

    const filteredOrders = order.filter((item) =>
        activeTab === 'inProcess'
            ? item.status === 'inprocess'
            : item.status === 'completed'
    );


    const handleUpdate = async(orderId) =>{
        await axios.put(`${import.meta.env.VITE_URL}admin/food/updateOrder/${orderId}`,{
            value:id
        })
        .then((res)=>{
            setChanges(prevChange => !prevChange);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            {/* Tab Section */}
            <div className="max-w-6xl mx-auto mt-6 px-4">
                <div className="flex space-x-4 border-b border-gray-200">
                    <button
                        className={`py-2 px-4 ${activeTab === 'inProcess'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('inProcess')}
                    >
                        In Process
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === 'completed'
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed
                    </button>
                </div>

                {/* Order Card */}
                {filteredOrders.slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((item, index) => (
                    <div key={index} className="my-5">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                {activeTab === 'inProcess' ? <h3 className="text-lg font-semibold">
                                    OrderNo: {index + 1}
                                </h3> : <p className='text-green-500'>Completed</p>}
                                <span className="text-gray-500">{new Date(item.createdAt).toLocaleDateString('en-GB')}</span>
                            </div>

                            <div className="space-y-2 mb-4">
                                {item.orderDetails.map((items, idx) => (
                                    <div
                                        key={idx}
                                        className="flex justify-between items-center text-gray-600"
                                    >
                                        <span>{items.itemName}</span>
                                        <div className="flex items-center space-x-4">
                                            <span>Qty: {items.itemQuantity}</span>
                                            <span>₹ {items.itemPrice}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-center border-t pt-4">
                                <div className="text-xl font-bold">
                                    Total: ₹ {item.orderPrice}
                                </div>
                                {activeTab === 'inProcess' ? <button
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                    onClick={()=> handleUpdate(item._id)}
                                >
                                    Complete Order
                                </button> : ""}

                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Order;