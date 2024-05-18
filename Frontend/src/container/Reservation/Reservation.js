import React, { useState } from "react";
import axios from "axios";
import { images } from '../../constants';
import './Reservation.scss';
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../FlashMessage/FlashMessage";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import Slides from "../Slides/Slides";

import { baseURL, appURL } from "../../config/api";

function Reservation() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [flashMessage, setFlashMessage] = useState(false);

  const [formValue, setformValue] = useState({
    name: '',
    seats:'',
    phone_number: '',
    date:'',
    time:''
  });

  const handleChange = (event) =>{
    setformValue({
        ...formValue,
        [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  }

  const handleConfirmation= (isConfirmed) =>{
    if(isConfirmed){

      axios.post(`${baseURL}/reservation/createReservation`,{
        name: formValue.name,
        seats: formValue.seats,
        phone_number: formValue.phone_number,
        date: formValue.date,
        time: formValue.time,
      })
        .then(response=>{
          console.log("Response:", response);

          if(response.status === 200){
            setFlashMessage({ type: 'success', message: 'We recieved your seats reservation request, Happy to see you soon!' });
          }
        })
        .catch(error=>{
          if(error.response){
            console.error('Error:', error);
            setFlashMessage({ type: 'error', message: 'Reservation failed, try again!' });
          } else{
            console.error('Network or request error')
          }
        })
    } 
    setShowConfirmation(false); 
  }

  return (
    <div className={`reserve-body ${showConfirmation ? 'show-confirmation' : ''}`}>
      <h1 className="reserve-title">Reservation</h1>
      <div className="reserve">
        <img src={images.pizza} alt="Dal-makhani" />
        <form id="reservation-form" onSubmit={handleFormSubmit}>
          <label htmlFor="name" aria-required="true">Name:
            <input 
              type="text" 
              placeholder="Enter your name"
              id="name" 
              name="name" 
              value={formValue.name} 
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="seats">Number of People
            <select 
              id="seats" 
              name="seats"
              value={formValue.seats} 
              onChange={handleChange}
            >
              <option value="" disabled selected>Number of People</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8+">8+ People</option>
            </select>
          </label>
          <label htmlFor="phone_number">Phone Number:
            <input 
              type="tel" 
              placeholder="Phone number"
              id="phone_number" 
              name="phone_number"
              value={formValue.phone_number} 
              onChange={handleChange}
              required 
            />
          </label>
          <label htmlFor="date">Date:
            <input 
              type="date" 
              id="date" 
              name="date" 
              aria-hidden="true" 
              value={formValue.date} 
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="time">Time:
            <select 
              id="time" 
              name="time"
              value={formValue.time} 
              onChange={handleChange}
            >
              <option value="" disabled selected>Time</option>
              <option value="2300">11:00 PM</option>
              <option value="2230">10:30 PM</option>
              <option value="2200">10:00 PM</option>
              <option value="2130">9:30 PM</option>
              <option value="2100">9:00 PM</option>
              <option value="2030">8:30 PM</option>
              <option value="2000">8:00 PM</option>
              <option value="1930">7:30 PM</option>
              <option value="1900">7:00 PM</option>
              <option value="1830">6:30 PM</option>
              <option value="1800">6:00 PM</option>
              <option value="1730">5:30 PM</option>
              <option value="1700">5:00 PM</option>
              <option value="1630">4:30 PM</option>
              <option value="1600">4:00 PM</option>
              <option value="1530">3:30 PM</option>
              <option value="1500">3:00 PM</option>
              <option value="1430">2:30 PM</option>
              <option value="1400">2:00 PM</option>
              <option value="1330">1:30 PM</option>
              <option value="1300">1:00 PM</option>
              <option value="1230">12:30 PM</option>
              <option value="1200">12:00 PM</option>
              <option value="1130">11:30 AM</option>
              <option value="1100">11:00 AM</option>
              <option value="1030">10:30 AM</option>
              <option value="1000">10:00 AM</option>
              <option value="0930">9:30 AM</option>
              <option value="0900">9:00 AM</option>
              <option value="0830">8:30 AM</option>
              <option value="0800">8:00 AM</option>
              <option value="0730">7:30 AM</option>
              <option value="0700">7:00 AM</option>
            </select>
          </label>
          <button className='reservation-btn' type="submit">Find A Table</button>
        </form>


          {/* confirmation component */}
        {showConfirmation && (
          <ConfirmationDialog
            message={"Are you sure you want to submit this form?"}
            onConfirm={handleConfirmation}
          />
        )
        }

        {/* flash component */}
        {flashMessage &&
           <FlashMessage type={flashMessage.type} message={flashMessage.message} />}

      </div>
    </div>
  )
}

export default Reservation;