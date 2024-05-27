import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { format, parseISO, isValid } from 'date-fns';
import { useAuth } from '../../AuthProvider/AuthProvider';
import ReservationForm from './ReservationForm/ReservationForm';
import TableAvailability from './TableAvailability';
import Availability from './Availability';

export const Reservations = () => {
    const [availability, setAvailability] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedGuest, setSelectedGuest] = useState("");
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showTable, setShowTable] = useState(false);

    const { isLoggedIn } = useAuth();

    const parsedDate = isValid(parseISO(selectedDate)) ? parseISO(selectedDate) : new Date();

    const navigate = useNavigate();
    const location = useLocation();

    const handleBook = (table, slot) => {

        if (isLoggedIn) {
            setSelectedTable(table);
            setSelectedSlot(slot);
            // Navigate to the bookingTable route with query parameters
            navigate(`/bookingTable?tableNumber=${table}&timeSlot=${slot}&date=${selectedDate}&capacity=${selectedGuest}`);
        }
        else{
            navigate("/register");
        }
    };

    return (
        <div className="container mx-auto py-4 px-2 md:px-4">
            {!showTable ?
                <Availability
                    setAvailability={setAvailability}
                    setSelectedDate={setSelectedDate}
                    setSelectedGuest={setSelectedGuest}
                    setShowTable={setShowTable}
                /> :
                <div className='bg-white border md:max-w-[60vw] h-[80vh] overflow-hidden overflow-y-auto mx-auto shadow-lg text-2xl relative'>
                    <div className='px-3 py-2 flex bg-[#340926] text-white text-center justify-between items-center sticky top-0 z-50'>
                        <button
                            type="button"
                            onClick={() => setShowTable(!setShowTable)}
                            className="text-2xl transition duration-200"
                        >
                            &lt;
                        </button>
                        <h1 className='text-xl '>{format(parsedDate, 'EEE, dd MMM')} : {selectedGuest} Guests</h1>
                        <div className=''></div>
                    </div>
                    <h2 className='text-center text-xl py-3 bg-slate-100 '>Select a time at Khaao Restaurant</h2>
                    <TableAvailability
                        availability={availability}
                        onBook={handleBook}
                    />
                </div>
            }

            <Routes>
                <Route path="bookingTable" element={<ReservationForm />} />
            </Routes>
        </div>
    );
};
