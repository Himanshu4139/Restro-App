import React, { useEffect, useState } from 'react';
import User_header from '../Components/User_header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';

const User_order = () => {
    const [activeTab, setActiveTab] = useState('inProcess');
    const [order, setOrder] = useState([]);
    const [cookies] = useCookies(['token']);
    const decode = jwtDecode(cookies.token);
    const { id } = useParams();
    const changes = useSelector((state) => state.changes.value);

    useEffect(() => {

        axios
            .get(`${import.meta.env.VITE_URL}admin/profile/${id}`)
            .then((res) => {
                setOrder(res.data.admin.orders);
            })
            .catch((err) => {
                console.error(err);
            });
    }, );

    const findNo = order.filter((item) => item.status === 'inprocess');

    const filteredOrders = order.filter((item) => item.status === 'completed');


    return (
        <>
            <div className="h-full bg-gray-100">
                <User_header id={id} />

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

                    {
                        activeTab === 'inProcess' ? (
                            findNo
                                .slice()
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((item, index) => {
                                    if (item.userId !== decode._id) return null; // Skip items not matching userId

                                    return (
                                        <div key={index} className="my-4">
                                            <div className="bg-white rounded-lg shadow-md p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-lg font-semibold">OrderNo: {index + 1}</h3>
                                                    <span className="text-gray-500">
                                                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    {item.orderDetails.map((detail, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-gray-600">
                                                            <span>{detail.itemName}</span>
                                                            <div className="flex items-center space-x-4">
                                                                <span>Qty: {detail.itemQuantity}</span>
                                                                <span>₹ {detail.itemPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <div className="text-xl font-bold">Total: ₹ {item.orderPrice}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            filteredOrders
                                .slice()
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((item, index) => {
                                    if (item.userId !== decode._id) return null; // Skip items not matching userId

                                    return (
                                        <div key={index} className="my-4">
                                            <div className="bg-white rounded-lg shadow-md p-6">
                                                <div className="flex justify-between items-center mb-4">
                                                    <p className="text-green-500">Completed</p>
                                                    <span className="text-gray-500">
                                                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                                    </span>
                                                </div>

                                                <div className="space-y-2 mb-4">
                                                    {item.orderDetails.map((detail, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-gray-600">
                                                            <span>{detail.itemName}</span>
                                                            <div className="flex items-center space-x-4">
                                                                <span>Qty: {detail.itemQuantity}</span>
                                                                <span>₹ {detail.itemPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-between items-center border-t pt-4">
                                                    <div className="text-xl font-bold">Total: ₹ {item.orderPrice}</div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                        )
                    }




                </div>
            </div>
        </>
    );
};

export default User_order;
