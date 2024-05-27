import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import axios from 'axios';
import { baseURL } from '../../config/api';
import PreLoader from '../PreLoader/PreLoader';

const Availability = ({ setAvailability, setSelectedDate, setSelectedGuest, setShowTable }) => {

    const [processing, setProcessing] = useState(false);
    const [formValue, setFormValue] = useState({
        date: format(new Date(), 'yyyy-MM-dd'),
        number_of_people: 2
    });
    const [showGuestOptions, setShowGuestOptions] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setProcessing(true);
        setSelectedDate(formValue.date);
        setSelectedGuest(formValue.number_of_people);
        axios.get(`${baseURL}/reservation/availableSlots`, {
            params: {
                date: formValue.date,
                number_of_people: formValue.number_of_people
            }
        })
            .then(response => {
                console.log("Response", response);
                if (response.status === 200) {
                    setAvailability(response.data);
                    setShowTable(true);
                    console.log("fetched successfully");
                } else if (response.status === 400) {
                    console.log("Date and number of people are required")
                }
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error:', error);
                    console.error('Error fetching availability:', error)
                } else {
                    console.error('Network or request error')
                }
            })
            .finally(()=>{
                setProcessing(false);
            })
    };

    const handleChange = (event) => {
        setShowDatePicker(false);
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const formatDate = (date) => format(new Date(date), 'EEE, dd MMM');

    const handleDateChange = (days) => {
        const newDate = addDays(new Date(formValue.date), days);
        setFormValue({
            ...formValue,
            date: format(newDate, 'yyyy-MM-dd')
        });
    };

    const handleGuestChange = (delta) => {
        const newNumber = formValue.number_of_people + delta;
        if (newNumber >= 2 && newNumber <= 10) {
            setFormValue({
                ...formValue,
                number_of_people: newNumber
            });
        }
    };

    return (
        <div className="container mx-auto px-0 md:p-4">
            <form onSubmit={handleFormSubmit} className="bg-white pb-6 border md:max-w-[60vw] mx-auto shadow-lg text-2xl">
                <h1 className='py-2 px-3 text-xl text-white bg-[#340926]'>Khaao restaurant</h1>
                <div className="mb-6 flex flex-col items-center justify-between border-b-2 border-gray-200">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-1 md:space-x-10">
                            <button
                                type="button"
                                onClick={() => handleDateChange(-1)}
                                className="px-3 py-2 rounded hover:bg-gray-100 transition duration-200"
                            >
                                &lt;
                            </button>
                            <span
                                onClick={() => setShowDatePicker(true)}
                                className={`cursor-pointer px-3 py-2 transition duration-200 w-44 text-center whitespace-nowrap`}
                            >
                                {formatDate(formValue.date)}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleDateChange(1)}
                                className="px-3 py-2 rounded hover:bg-gray-100 transition duration-200"
                            >
                                &gt;
                            </button>
                        </div>
                        {showDatePicker && (
                            <input
                                type="date"
                                min={format(new Date(), 'yyyy-MM-dd')}
                                value={formValue.date}
                                onChange={handleChange}
                                name="date"
                                className="mt-2 text-[16px] border"
                            />
                        )}
                    </div>
                    <label className="block text-xl text-gray-700 mb-2">Date</label>
                </div>
                <div className="mb-6 flex flex-col items-center justify-between border-b-2 border-gray-200">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-1 md:space-x-10">
                            <button
                                type="button"
                                onClick={() => handleGuestChange(-2)}
                                className="px-3 py-2 rounded hover:bg-gray-100 transition duration-200 "
                            >
                                &lt;
                            </button>
                            <span
                                onClick={() => setShowGuestOptions(!showGuestOptions)}
                                className="cursor-pointer px-3 py-2 transition duration-200 w-44 text-center whitespace-nowrap"
                            >
                                {formValue.number_of_people}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleGuestChange(2)}
                                className="px-3 py-2 rounded hover:bg-gray-100 transition duration-200"
                            >
                                &gt;
                            </button>
                        </div>
                        {showGuestOptions && (
                            <div className="mt-2 max-h-40 overflow-y-auto border rounded shadow-lg bg-white">
                                {[2, 4, 6, 10].map(num => (
                                    <div
                                        key={num}
                                        onClick={() => {
                                            setFormValue({ ...formValue, number_of_people: num });
                                            setShowGuestOptions(false);
                                        }}
                                        className="cursor-pointer px-3 py-2 w-[50vw] text-center text-xl hover:bg-[#340926] hover:text-white transition duration-200"
                                    >
                                        {num}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <label className="block text-xl text-gray-700 mb-2">Guests</label>
                </div>
                <div className=' px-6'>
                    <button
                        type="submit"
                        disabled={processing}
                        className={`w-full text-white text-xl px-4 py-2 rounded transition duration-300 shadow ${processing ? "bg-blue-400": "bg-blue-500 hover:bg-blue-700 " }`}
                    >
                        {processing ? <PreLoader/> :"Check Availability/Search"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Availability;
