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
  });

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
  };

  const formatTime  = (time) =>{
    const timeSlot = time;
    const convertedtime = new Date(`2000-01-01T${timeSlot}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return convertedtime;
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


  return (
    <div className="reservations">
      <h2>Reservations</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr className='whitespace-nowrap'>
              <th>ID</th>
              <th>Profile</th>
              <th>Contact</th>
              <th>Reserved Date</th>
              <th>Party Size</th>
              <th>Transaction ID</th>
              <th>Special Request</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {reservationData.map((reservation, index) => (
              <tr
                key={reservation.reservationID}
                className={getAnimationClassName(index)}
              >
                <td>{reservation.reservationid ?reservation.reservationid : index+1 }</td>

                <td>
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    <i class="fa-solid fa-user text-xl rounded-full p-2 text-white bg-black "></i>
                    <div>{reservation.name}
                      <br />
                      {/* <small className="text-gray-500">kh-{reservation.userid}</small> */}
                    </div>
                  </div>
                </td>

                <td className='whitespace-nowrap'>
                  <i className="fas fa-envelope pr-2  "></i> <a href={`mailto:${reservation.email}`} className='text-black no-underline hover:underline'>{reservation.email}</a>
                  <br />
                  <i className="fas fa-phone pr-2"></i> <a href={`tel:${reservation.contact_number}`} className='no-underline text-gray-500 hover:underline'><small className="text-gray-500 ">{reservation.contact_number}</small></a>
                </td>

                <td>{formatDate(reservation.date)}
                  <br />
                  <small className="text-gray-500">{formatTime(reservation.time)}</small>
                </td>

                <td>
                  <div className='m-0' title={`Number of Guests ${reservation.partysize}`}>NG-{reservation.partysize}</div>
                  {/* <br/> */}
                  <small className="text-gray-500" title={`Table Number ${reservation.table_id}`}>TN-{reservation.table_id}</small>
                </td>

                <td>{reservation.transaction_id}</td>
                <td>{reservation.specialrequest ? reservation.specialrequest : "NA"}</td>
                {/* <td>
                  <button onClick={() => handleDeleteReservation(reservation.reservationID)}>
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewReservation;

