import React from 'react';

const TableAvailability = ({ availability, onBook }) => {
  const currentTime = new Date().getTime();

  return (
    <div className="space-y-4">
      {Object.keys(availability).map(tableNumber => (
        <div key={tableNumber} className="py-4 ">
          <h2 className="text-xl font-semibold mb-4 bg-gray-300 px-4 py-3">Table {tableNumber}</h2>
          <div className="flex flex-wrap gap-2 px-4">
            {availability[tableNumber]
              .filter(slot => new Date(slot).getTime() >= currentTime)
              .map(slot => (
                <button
                  key={slot}
                  className="bg-blue-500 text-white text-xl px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => onBook(tableNumber, slot)}
                >
                  {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableAvailability;
