import axios from "axios";
import { baseURL } from "../config/api";

// export default async function displayRazorpay(name, seats, phone_number, date, time, tableNumber, token, isLoggedIn) {

//     const email = localStorage.getItem("email")

//     if (email) {

//         try {
//             const response = await axios.post(`${baseURL}/payment/razorpay`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 credentials: 'include'
//             }, {
//                 amount : 400
//             });

//             const { data } = response;

//             console.log("data", data);


//             const options = {
//                 key: "rzp_test_ybHLy3FaPafQLd",
//                 currency: "INR",
//                 amount: 400,
//                 name: "Khaao Restaurant",
//                 description: "Wallet Transaction",
//                 //   image: "http://localhost:1337/logo.png",
//                 order_id: data.id,
//                 handler: function (response) {
//                     alert("PAYMENT ID ::" + response.razorpay_payment_id);
//                     // alert("ORDER ID :: " + response.razorpay_order_id);
//                     alert("check your registered mail span for confirmation mail")

//                     // Make a POST request to the backend using Axios
//                     axios.post(`${baseURL}/payment/onsuccessfullpayement`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                         credentials: 'include'
//                     }, {
//                         email: "prajapatjinesh585@gmail.com",
//                         name: name,
//                         seats: seats,
//                         date: date,
//                         time:time, 
//                         tableNumber:tableNumber
//                     })
//                         .then((response) => {
//                             console.log("Response from backend:", response.data);
//                         })
//                         .catch((error) => {
//                             console.error("Error posting data to backend:", error);
//                         });
//                 },
//                 prefill: {
//                     name: name,
//                     email: "",
//                     contact: "",
//                     seats: seats,
//                     date: date,
//                     time: time,
//                     tableNumber: tableNumber
//                 }
//             };

//             const paymentObject = new window.Razorpay(options);
//             paymentObject.open();
//         } catch (error) {
//             console.error("Error creating Razorpay order:", error);
//         }
//     }

//     else {
//         window.location = "/register";
//     }
// }

export default function displayRazorpay(name, email, numberOfGuests, phone_number, reservationDate, reservationTime, tableNumber, token) {
    return new Promise(async (resolve, reject) => {
        const amount = 200;
        if (token) {
            try {
                const response = await axios.post(`${baseURL}/payment/razorpay`,  {
                    amount
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    credentials: 'include'
                });

                const { data } = response;
                console.log("data", data);

                const options = {
                    key: "rzp_test_ybHLy3FaPafQLd",
                    currency: "INR",
                    amount: amount,
                    name: "Khaao Restaurant",
                    description: "Wallet Transaction",
                    order_id: data.id,
                    handler: function (response) {
                        alert("PAYMENT ID ::" + response.razorpay_payment_id);
                        alert("check your registered mail span for confirmation mail");

                        axios.post(`${baseURL}/payment/onsuccessfullpayement`, {
                            email: email,
                            name: name,
                            seats: numberOfGuests,
                            date: reservationDate,
                            time: reservationTime,
                            tableNumber: tableNumber
                        },{
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            credentials: 'include'
                        },)
                        .then((response) => {
                            console.log("Response from backend:", response.data);
                            resolve(); // Resolve the promise on successful payment
                        })
                        .catch((error) => {
                            console.error("Error posting data to backend:", error);
                            reject(error); // Reject the promise if there is an error
                        });
                    },
                    prefill: {
                        name: name,
                        email: email,
                        contact: phone_number,
                        seats: numberOfGuests,
                        date: reservationDate,
                        time: reservationTime,
                        tableNumber: tableNumber
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
            } catch (error) {
                console.error("Error creating Razorpay order:", error);
                reject(error); // Reject the promise if there is an error
            }
        } else {
            window.location = "/register";
        }
    });
}
