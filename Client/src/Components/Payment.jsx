import React, { useState } from 'react';

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState('');

    const paymentOptions = [
        { id: 'paytm', name: 'Paytm' },
        { id: 'phonepay', name: 'Phone Pay' },
        { id: 'googlepay', name: 'Google Pay' },
    ];

    return (
        <div className="flex items-center justify-center absolute top-80 left-0 w-full h-full">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Select Payment Method
                </h2>
                <div className="space-y-4">
                    {paymentOptions.map((option) => (
                        <div key={option.id} className="flex items-center">
                            <input
                                type="radio"
                                id={option.id}
                                name="payment"
                                value={option.id}
                                checked={selectedPayment === option.id}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label
                                htmlFor={option.id}
                                className="ml-3 block text-gray-700 cursor-pointer"
                            >
                                {option.name}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => console.log('Selected payment:', selectedPayment)}
                >
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
};

export default Payment;