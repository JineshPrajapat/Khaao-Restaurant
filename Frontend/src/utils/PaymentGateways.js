import axios from "axios";
import { baseURL } from "../config/api";

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
                    key: "rzp_test_Y5saFssULUDwHJ",
                    currency: "INR",
                    amount: amount,
                    name: "Khaao Restaurant",
                    description: "Wallet Transaction",
                    order_id: data.id,
                    handler: function (response) {
                        // alert("PAYMENT ID ::" + response.razorpay_payment_id);
                        // alert("check your registered mail span for confirmation mail");

                        axios.post(`${baseURL}/payment/onSuccessfulPayment`, {
                            email: email,
                            name: name,
                            seats: numberOfGuests,
                            date: reservationDate,
                            time: reservationTime,
                            tableNumber: tableNumber,
                            transaction_id: response.razorpay_payment_id
                        },{
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            credentials: 'include'
                        },)
                        .then((response) => {
                            console.log("Response from backend:", response.data);
                            resolve(response.data); // Resolve the promise on successful payment
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
