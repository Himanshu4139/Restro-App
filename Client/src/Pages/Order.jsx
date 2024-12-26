import React, { useState } from 'react';
import Header from '../Components/Header';

const Order = () => {
    const [activeTab, setActiveTab] = useState('inProcess');

    const sampleOrder = {
        orderNo: "#ORD123456",
        orderDate: "2024-01-20",
        orderPrice: "$45.99",
        items: ["Pizza Margherita", "Coke", "Garlic Bread"]
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            
            {/* Tab Section */}
            <div className="max-w-6xl mx-auto mt-6 px-4">
                <div className="flex space-x-4 border-b border-gray-200">
                    <button
                        className={`py-2 px-4 ${
                            activeTab === 'inProcess'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('inProcess')}
                    >
                        In Process
                    </button>
                    <button
                        className={`py-2 px-4 ${
                            activeTab === 'completed'
                                ? 'border-b-2 border-blue-500 text-blue-600'
                                : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab('completed')}
                    >
                        Completed
                    </button>
                </div>

                {/* Order Card */}
                <div className="mt-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Order {sampleOrder.orderNo}</h3>
                            <span className="text-gray-500">{sampleOrder.orderDate}</span>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                            {sampleOrder.items.map((item, index) => (
                                <div key={index} className="text-gray-600">{item}</div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center border-t pt-4">
                            <div className="text-xl font-bold">
                                Total: {sampleOrder.orderPrice}
                            </div>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                onClick={() => console.log('Order completed')}
                            >
                                Complete Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;