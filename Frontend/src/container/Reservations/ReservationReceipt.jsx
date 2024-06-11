import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleDownloadPdf } from '../../utils/DownloadPDF';
import { format} from 'date-fns';
import { images } from '../../constants';

const companyInfo = {
  companyName: "Khaao Restaurant",
  address: "Rishabhdeo",
  contactNumber: "8905009854",
  email: "khaarestaurant@gmail.com"
};

function ReservationReceipt({ reservationData, transactionID }) {
  const receiptRef = useRef();
  const navigate = useNavigate();

  console.log("reservationData",reservationData)

  const timeSlot = reservationData.reservationTime;
  const time = new Date(`2000-01-01T${timeSlot}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const formatDate = (date) => format(new Date(date), 'EEE, dd MMM');





  const handleBack = () => {
    navigate("/reservations")
  };

  return (
    <div ref={receiptRef} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-10 md:max-w-2xl lg:max-w-4xl">
      {/* Company Information */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">{companyInfo.companyName}</h2>
        <p className="text-sm text-gray-600">{companyInfo.address}</p>
        <p className="text-sm text-gray-600">Contact: {companyInfo.contactNumber} | Email: {companyInfo.email}</p>
      </div>

      <hr className="my-4" />

      {/* Reservation Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Reservation Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><span className="font-semibold">Full Name:</span> {reservationData.name}</p>
          <p><span className="font-semibold">Phone Number:</span> {reservationData.phone_number}</p>
          <p><span className="font-semibold">Email:</span> {reservationData.email}</p>
          <p><span className="font-semibold">Transaction ID:</span> {reservationData.transaction_id}</p>
          <p><span className="font-semibold">Table Number:</span> {reservationData.tableNumber}</p>
          <p><span className="font-semibold">Date:</span> {formatDate(reservationData.reservationDate)}</p>
          <p><span className="font-semibold">Time:</span> {time}</p>
          <p><span className="font-semibold">Number of Guests:</span> {reservationData.numberOfGuests}</p>
          <p className="col-span-1 md:col-span-2"><span className="font-semibold">Special Requests:</span> {reservationData.specialRequest ? reservationData.specialRequest : "NA"}</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Amount Charged */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Amount Charged</h3>
        <p className="text-lg font-bold">INR 200</p>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p>Thank you for choosing {companyInfo.companyName}. For any issues or queries, please contact us using the provided details.</p>
        <p>This receipt serves as confirmation of your reservation. Please keep it for your reference.</p>
      </div>

      <div className="text-center flex justify-evenly">
        <button
          onClick={handleBack}
          className=" text-black font-bold py-2 px-8 rounded bg-slate-200 duration-400 hover:bg-slate-400">
          Close
        </button>

        <button
          onClick={() => handleDownloadPdf(receiptRef)}
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded duration-400 hover:bg-blue-900">
          Download Receipt
        </button>
      </div>
    </div>
  );
}

export default ReservationReceipt;
