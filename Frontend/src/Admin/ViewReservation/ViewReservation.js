import React, { useState, useEffect } from 'react';
import './ViewReservation.scss';
import { baseURL } from '../../config/api';
import { fetchData } from '../../FetchData/fetchData';
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

  useEffect(() => {
    fetchData(`${baseURL}/admin/getReservation`, setReservationData)
  })

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
              <th>Contact Number</th>
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

