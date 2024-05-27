import React from 'react';

function ReservationReceipt({ reservationData, companyInfo }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      {/* Company Information */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-700">{companyInfo.companyName}</h2>
        <p className="text-sm text-gray-600">{companyInfo.address}</p>
        <p className="text-sm text-gray-600">Contact: {companyInfo.contactNumber} | Email: {companyInfo.email}</p>
      </div>
      
      {/* Reservation Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Reservation Details</h3>
        <p><span className="font-semibold">Table Number:</span> {reservationData.tableNumber}</p>
        <p><span className="font-semibold">Date:</span> {reservationData.reservationDate}</p>
        <p><span className="font-semibold">Time:</span> {reservationData.reservationTime}</p>
        <p><span className="font-semibold">Number of Guests:</span> {reservationData.numberOfGuests}</p>
        <p><span className="font-semibold">Full Name:</span> {reservationData.name}</p>
        <p><span className="font-semibold">Phone Number:</span> {reservationData.phone_number}</p>
        <p><span className="font-semibold">Email:</span> {reservationData.email}</p>
        <p><span className="font-semibold">Special Requests:</span> {reservationData.specialRequest}</p>
      </div>

      {/* Amount Charged */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Amount Charged</h3>
        <p>INR 200</p>
      </div>

      {/* Additional Notes or Terms */}
      <div className="text-sm text-gray-600 mb-6">
        <p>Thank you for choosing {companyInfo.companyName}. For any issues or queries, please contact us using the provided details.</p>
        <p>This receipt serves as confirmation of your reservation. Please keep it for your reference.</p>
      </div>
    </div>
  );
}

export default ReservationReceipt;
