import React, { useState } from "react";
import axios from "axios";
import { Navigate, useSearchParams, useNavigate, useActionData } from 'react-router-dom';
import { images } from '../../../constants';
import './ReservationForm.scss';
import ConfirmationDialog from "../../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../../FlashMessage/FlashMessage";
import PreLoader from "../../PreLoader/PreLoader";
import displayRazorpay from "../../../utils/PaymentGateways";
import ReservationReceipt from "../ReservationReceipt";

import { baseURL } from "../../../config/api";

function ReservationForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [onSuccessfulReservation, setOnSuccessfulReservation] =useState(false);
  const [flashMessage, setFlashMessage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransactionID] = useState();
  const [paymentResponse, setPaymentResponse ] =useState([]);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const tableNumber = searchParams.get('tableNumber');
  const timeSlot = searchParams.get('timeSlot');
  const date = searchParams.get('date');
  const capacity = searchParams.get("capacity");

  
  const time = new Date(timeSlot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateObject = new Date(timeSlot);
  const timeString = dateObject.toTimeString().split(' ')[0];

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    phone_number: "",
    specialRequest: "",
    numberOfGuests: capacity,
    reservationDate: date,
    reservationTime: timeString,
    tableNumber: tableNumber,
    consent: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formValue.name) newErrors.name = "Full Name is required";
    if (!formValue.phone_number) newErrors.phone_number = "Phone Number is required";
    if (!formValue.email) newErrors.email = "Email is required";
    if (!formValue.consent) newErrors.consent = "You must confirm the information";
    return newErrors;
  };

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setShowConfirmation(true);
    }
  }

  function createReservation(name, email, phone_number, numberOfGuests, reservationDate, reservationTime, tableNumber, specialRequest, transaction_id, token) {
    return axios.post(`${baseURL}/reservation/createReservation`, {
      name,
      email,
      phone_number,
      numberOfGuests,
      reservationDate,
      reservationTime,
      tableNumber,
      specialRequest,
      transaction_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    });
  }

  const handleConfirmation = (isConfirmed) => {
    setProcessing(true);
    if (isConfirmed) {
      const token = localStorage.getItem('token');
      const { name, email, numberOfGuests, phone_number, reservationDate, reservationTime, tableNumber, specialRequest } = formValue;

      displayRazorpay(name, email, numberOfGuests, phone_number, reservationDate, reservationTime, tableNumber, token)
        .then((paymentResponse) => {

          return createReservation(name, email, phone_number, numberOfGuests, reservationDate, reservationTime, tableNumber, specialRequest, paymentResponse.data.transaction_id, token);
        })
        .then(response => {
          console.log("reservation created successfully");
          if (response.status === 200) {
            console.log("reservation created successfully",response.data);
            setPaymentResponse(response.data);
            setOnSuccessfulReservation(true);
            setFlashMessage({ type: 'success', message: 'We received your seats reservation request, Happy to see you soon!' });
          }
        })
        .catch(error => {
          setProcessing(false);
          if (error.response) {
            if (error.response.status === 500) {
              setFlashMessage({ type: 'error', message: 'Reservation failed, try again!' });
            }
          }
        })
        .finally(() => {
          setProcessing(false);
          setFormValue(
            {
              name: "",
              email: "",
              phone_number: "",
              specialRequest: "",
              numberOfGuests: capacity,
              reservationDate: date,
              reservationTime: timeString,
              tableNumber: tableNumber,
              consent: false,
            }
          )
        });
    }
    setShowConfirmation(false);
  }

  return (
    <div className={`reserve-body ${showConfirmation ? 'show-confirmation' : ''}`}>

      {!onSuccessfulReservation ?
        <div className="max-w-xl md:max-w-3xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-lg my-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Reservation Form</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6 ">
            <div className=' sm:flex gap-12'>
              <div className="bg-gray-100 p-4 rounded space-y-4 sm:w-[50vw]">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Table Number</label>
                  <input
                    type="text"
                    name="tableNumber"
                    value={formValue.tableNumber}
                    // onChange={handleChange}
                    disabled
                    className="w-full border bg-white border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Date of Reservation</label>
                  <input
                    type="date"
                    name="reservationTime"
                    value={formValue.reservationDate}
                    // onChange={handleChange}
                    disabled
                    className="w-full border bg-white border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Time of Reservation</label>
                  <input
                    type="time"
                    name="reservationTime"
                    value={formValue.reservationTime}
                    // onChange={handleChange}
                    disabled
                    className="w-full border bg-white border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Number of Guests</label>
                  <input
                    type="number"
                    name="numberOfGuests"
                    value={formValue.numberOfGuests}
                    // onChange={handleChange}
                    disabled
                    className="w-full border bg-white border-gray-300 p-2 rounded"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div className='sm:w-[50vw] p-4'>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formValue.name}
                    onChange={handleChange}
                    onFocus={(e) => e.target.classList.add('ring-2', 'ring-blue-500')}
                    onBlur={(e) => e.target.classList.remove('ring-2', 'ring-blue-500')}
                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded mb-3 focus:outline-none transition duration-150 ease-in-out`}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formValue.phone_number}
                    onChange={handleChange}
                    onFocus={(e) => e.target.classList.add('ring-2', 'ring-blue-500')}
                    onBlur={(e) => e.target.classList.remove('ring-2', 'ring-blue-500')}
                    className={`w-full border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} p-2 rounded mb-3 focus:outline-none transition duration-150 ease-in-out`}
                    required
                  />
                  {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formValue.email}
                    onChange={handleChange}
                    onFocus={(e) => e.target.classList.add('ring-2', 'ring-blue-500')}
                    onBlur={(e) => e.target.classList.remove('ring-2', 'ring-blue-500')}
                    className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded mb-3 focus:outline-none transition duration-150 ease-in-out`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Special Requests</label>
                  <textarea
                    name="specialRequest"
                    value={formValue.specialRequest}
                    onChange={handleChange}
                    onFocus={(e) => e.target.classList.add('ring-2', 'ring-blue-500')}
                    onBlur={(e) => e.target.classList.remove('ring-2', 'ring-blue-500')}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none transition duration-150 ease-in-out"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <input
                type="checkbox"
                name="consent"
                checked={formValue.consent}
                onChange={handleChange}
                className="mr-2 mt-1"
                required
              />
              <label className="font-medium text-gray-700">
                I confirm that the above information is correct and I understand the restaurant's reservation and cancellation policies.
              </label>
              {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              className={`w-full text-white p-2 rounded transition duration-200 ${processing ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={processing}
            >
              {processing ? <PreLoader /> : "Submit Reservation"}
            </button>
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

        : 
        <ReservationReceipt reservationData={paymentResponse.data} transactionID={transactionID}/>}
    </div>
  );
}

export default ReservationForm;
