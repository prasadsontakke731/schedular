/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function Payment({ student, mentor, duration, isPremium, time, onConfirm }) {
    const calculateTotal = () => {
        const basePrice = duration === 30 ? 2000 : duration === 45 ? 3000 : 4000;
        return isPremium ? basePrice + 1000 : basePrice;
    };
    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-700">Payment Summary</h2>
            <p><strong>Student:</strong> {student.name}</p>
            <p><strong>Mentor:</strong> {mentor.name}</p>
            <p><strong>Duration:</strong> {duration} minutes</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Premium Service:</strong> {isPremium ? "Yes" : "No"}</p>
            <h3 className="text-xl font-bold text-gray-700">Total Price: ₹{calculateTotal()}</h3>

            <button
                onClick={onConfirm}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700"
            >
                Confirm Payment
            </button>
        </div>
    )
}

export default Payment