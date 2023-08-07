import React, { useState } from 'react';
import './ViewOrder.scss';

const orders = [
  {
    orderID: 1,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Pending',
  },
  {
    orderID: 2,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Pending',
  },
  {
    orderID: 3,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Pending',
  },
  {
    orderID: 1,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Pending',
  },
  {
    orderID: 4,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Progress',
  },
  {
    orderID: 5,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Progress',
  },
  {
    orderID: 6,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Pending',
  },
  {
    orderID: 7,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Progress',
  },
  {
    orderID: 8,
    userID: 101,
    menuID: 201,
    quantity: 2,
    specialInstructions: 'No onions',
    orderStatus: 'Completed',
  },

  // Add more orders here...
];

const ViewOrders = () => {

  const [orderData, setOrderData] = useState(orders);

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orderData.map((order) => {
      if (order.orderID === orderId) {
        return { ...order, orderStatus: newStatus };
      }
      return order;
    });
    setOrderData(updatedOrders);
  };


  const getStatusClassName = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Progress':
        return 'progress';
      case 'Completed':
        return 'completed';
      default:
        return '';
    }
  };

  return (
    <div className="orders">
      <h2>Orders</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Menu ID</th>
              <th>Quantity</th>
              <th>Special Instructions</th>
              <th>Order Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order.orderID} className={getStatusClassName(order.orderStatus)}>
                <td>{order.orderID}</td>
                <td>{order.userID}</td>
                <td>{order.menuID}</td>
                <td>{order.quantity}</td>
                <td>{order.specialInstructions}</td>
                <td>{order.orderStatus}</td>
                <td>
                  {order.orderStatus === 'Pending' && (
                    <button onClick={() => handleStatusChange(order.orderID, 'Progress')}>
                      Mark as Progress
                    </button>
                  )}
                  {order.orderStatus === 'Progress' && (
                    <button onClick={() => handleStatusChange(order.orderID, 'Completed')}>
                      Mark as Completed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewOrders;
