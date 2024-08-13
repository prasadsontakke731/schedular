/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import mentorsData from '../data/mentors.json';
import studentsData from '../data/students.json';
import timeSlotsData from "../data/timeSlots.json"
import durationData from '../data/durations.json';
import { saveAs } from "file-saver"

function Schedular() {

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDuration, setSelectedDuration] = useState(30);
    const [isPremium, setIsPremium] = useState(false);
    const [schedules, setSchedules] = useState([]);

    const handleSubmit = () => {
        const newSchedule = {
            student: selectedStudent,
            mentor: selectedMentor,
            time: selectedTime,
            duration: selectedDuration,
            premium: isPremium,
            totalPrice: calculatePrice(),
        };

        const updatedSchedules = [...schedules, newSchedule];
        setSchedules(updatedSchedules);

        // Convert to JSON and save to schedules.json
        const blob = new Blob([JSON.stringify(updatedSchedules)], { type: "application/json" });
        saveAs(blob, "schedules.json");

        // Reset form
        setSelectedStudent(null);
        setSelectedMentor(null);
        setSelectedTime("");
        setSelectedDuration(30);
        setIsPremium(false);
    };

    const calculatePrice = () => {
        const basePrice = durationData.find(d => d.duration === selectedDuration).price;
        return isPremium ? basePrice + 1000 : basePrice;
    };

    return (
        <div className="schedular p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Select Student:</label>
                <select
                    value={selectedStudent ? selectedStudent.id : ""}
                    onChange={(e) =>
                        setSelectedStudent(studentsData.find(s => s.id === parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">-- Select Student --</option>
                    {studentsData.map(student => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Select Mentor:</label>
                <select
                    value={selectedMentor ? selectedMentor.id : ""}
                    onChange={(e) =>
                        setSelectedMentor(mentorsData.find(m => m.id === parseInt(e.target.value)))
                    }
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">-- Select Mentor --</option>
                    {mentorsData.map(mentor => (
                        <option key={mentor.id} value={mentor.id}>
                            {mentor.name} ({mentor.area})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Select Time:</label>
                <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">-- Select Time --</option>
                    {timeSlotsData.map(slot => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Select Duration:</label>
                <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(parseInt(e.target.value))}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                >
                    {durationData.map(d => (
                        <option key={d.duration} value={d.duration}>
                            {d.duration} mins
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="form-checkbox"
                    />
                    <span className="ml-2">Premium Service (+1000)</span>
                </label>
            </div>

            <div className="mb-4">
                <h3 className="text-gray-700 font-bold">Total Price: ₹{calculatePrice()}</h3>
            </div>

            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700"
            >
                Submit
            </button>
        </div>
    )
}

export default Schedular