import React, { useState,useEffect } from 'react';
import './ViewReservation.scss';
import { baseURL } from '../../config/api';

// const reservations = [
//   {
//     reservationID: 1,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },
//   {
//     reservationID: 2,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },
//   {
//     reservationID: 3,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },
//   {
//     reservationID: 4,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },
//   {
//     reservationID: 5,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },
//   {
//     reservationID: 6,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   },

//   {
//     reservationID: 7,
//     userID: 101,
//     date: '2023-07-15',
//     time: '18:30',
//     partySize: 4,
//     contactInfo: 'john@example.com',
//     specialRequests: 'Highchair needed',
//   }

// ];

const ViewReservation = () => {

  const [reservationData, setReservationData] = useState([]);

  // fecthing data  from server
  const getReservation = async ()=>{
    try{
      const response = await fetch(`${baseURL}/admin/getReservation`)
      const jsonData = await response.json();
      setReservationData(jsonData);
    }catch(err){
      console.error(err.message);
    }
  }

  const handleDeleteReservation = (reservationID) => {
    const updatedReservations = reservationData.filter(
      (reservation) => reservation.reservationID !== reservationID
    );
    setReservationData(updatedReservations);
  };

  const getAnimationClassName = (index) => {
    const animationTypes = ['fade-in', 'slide-left', 'slide-right', 'zoom-in'];
    return animationTypes[index % animationTypes.length];
  };

  useEffect(()=>{
    getReservation();
  },[])

  return (
    <div className="reservations">
      <h2>Reservations</h2>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>User ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Party Size</th>
            <th>Contact Info</th>
            {/* <th>Special Requests</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationData.map((reservation, index) => (
            <tr
              key={reservation.reservationID}
              className={getAnimationClassName(index)}
            >
              <td>{reservation.reservationid}</td>
              <td>{reservation.userid}</td>
              <td>{reservation.name}</td>
              <td>{reservation.date}</td>
              <td>{reservation.time}</td>
              <td>{reservation.partysize}</td>
              <td>{reservation.contact_number}</td>
              {/* <td>{reservation.specialRequests}</td> */}
              <td>
                <button onClick={() => handleDeleteReservation(reservation.reservationID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ViewReservation;

