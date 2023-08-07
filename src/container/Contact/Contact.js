import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import ConfirmationDialog from "../ConfirmationDialog/ConfirmationDialog";
import FlashMessage from "../FlashMessage/FlashMessage";
import './Contact.scss';

function Contact() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [flashMessage, setFlashMessage] = useState(false);

    const [formValue, setformValue] = useState({
        name: '',
        email: '',
        phone_number: '',
        enquiry: '',
        message: ''
    });

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setShowConfirmation(true);
    }

    const handleConfirmation = (isConfirmed) => {
        if (isConfirmed) {

            axios.post("http://localhost:3000/Contact", {
                name: formValue.name,
                email: formValue.email,
                phone_number: formValue.phone_number,
                enquiry: formValue.enquiry,
                message: formValue.message,
            })
                .then(response => {
                    console.log("Response:", response);

                    if (response.status === 200) {
                        setFlashMessage({ type: 'success', message: 'Thank you for contacting us, soon you will get response!' });
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.error('Error:', error);
                        setFlashMessage({ type: 'error', message: 'Reservation failed, try again!' });
                    } else {
                        console.error('Network or request error')
                    }
                })
        }
        setShowConfirmation(false);
    }

    return (
        <div className={`${showConfirmation ? 'show-confirmation' : ''}`}>
            <div className="contact-heading">
                <h2>Contact Us</h2>
                <p>We would love to hear from you! Call, email or fax us or get directions to our restaurant all here in one place.</p>
            </div>
            <div className="contact-container">
                <form class="form" onSubmit={handleFormSubmit}>
                    <label for="name">Name
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
                    <label for="email">Email
                        <input
                            type="email"
                            placeholder="abc@gamil.com"
                            id="email"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label for="Phone-number">Phone Number
                        <input
                            type="tel"
                            placeholder="Phone-number"
                            id="Phone-number"
                            name="phone_number"
                            value={formValue.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label for="enquiry" aria-required="true">What are you getting in touch about ? - Optional
                        <select
                            name="enquiry"
                            id="enquiry"
                            value={formValue.enquiry}
                            onChange={handleChange}
                        >
                            <option value="" selected disabled>What are you getting in touch about ?</option>
                            <option value="General Enquiry">General Enquiry</option>
                            <option value="Press Enquiry">Press Enquiry</option>
                        </select>
                    </label>
                    <label for="message">Your Message
                        <textarea
                            id="message"
                            placeholder="Your Message"
                            name="message"
                            value={formValue.message}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" >Send</button>
                </form>
                <ul className="contact-info">
                    <li>
                        <h3>Give us a call</h3>
                        <a href="tel:8905009854">8905009854</a>
                        <p>Please leave a message if you call us during non-business hours and we will return your call.</p>
                    </li>
                    <li>
                        <h3>Send us a message</h3>
                        <a href="mailto:khaao@gmail.com">khaao@gmail.com</a>
                    </li>
                    <li>
                        <h3>We are located at</h3>
                        <span>132 W Main St. Rishabhdeo, CA 91801</span>
                    </li>
                    <li>
                        <h3>Our Hours</h3>
                        <span>Brunch: Thursday - Monday, 8am to 2:30pm</span>
                        <span>Dinner: Thursday - Sunday, 4pm to 10pm</span>
                        <span>Closed Tuesdays & Wednesdays</span>
                    </li>
                </ul>
            </div>

            {/* confirmation component */}
            {showConfirmation && (
                <ConfirmationDialog
                    message={"Are you sure you want to submit contact form?"}
                    onConfirm={handleConfirmation}
                />
            )}

            {/* flash component */}
            {flashMessage &&
                <FlashMessage type={flashMessage.type} message={flashMessage.message} />}
        </div>
    )
}

export default Contact;