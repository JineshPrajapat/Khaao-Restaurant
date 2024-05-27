exports.paymentTemplate = ( name, seats, date, time, tableNumber) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Payment Confirmation Email</title>
        <style>
            body {
                background-color: #ffffff;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                background-color: wheat;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }

            .logo {
                max-width: 200px;
                margin-bottom: 20px;
                border: none;
                border-radius: 30px;
            }

            .message {
                font-size: 2rem;
                font-weight: bold;
                margin-bottom: 20px;
                text-decoration: underline;
                color: midnightblue;
            }

            .body {
                font-size: 1.5rem;
                margin-bottom: 20px;
            }

            .para {
                font-size: 1rem;
            }

            .paras {
                font-size: 1rem;
                text-align: left;
            }

            .info {
                font-size: 14px;
                margin-top: 20px;
            }

            .highlight {
                font-weight: bold;
                color: midnightblue;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <a href=""><img class="logo" src="./mainLogo1.png" alt="Your Logo" /></a>
            <div class="message">Payment Confirmation</div>
            <div class="body">
                <p>Dear User,</p>
                <p class="para">Congratulations! You have successfully booked your table. Happy to see you soon.<span class="highlight"></span>.</p>
                <p class="paras">
                    <span class="highlight">Name:</span> ${name}
                </p>
                <p class="paras">
                    <span class="highlight">Table NUmber:</span> ${tableNumber}
                </p>
                <p class="paras">
                    <span class="highlight">Capacity:</span> ${seats}
                </p>
                <p class="paras">
                    <span class="highlight">Date:</span> ${date}
                </p>
                <p class="paras">
                    <span class="highlight">Time:</span> ${time}
                </p>
                
                // <p class="para">You are now enrolled in the class </p>
            </div>
            <div class="info">
                For any further assistance or inquiries, please contact us at
                <a href="mailto:team@beyondscool.com">Our Gmail</a>.
            </div>
            <div class="info">
                You can also visit our website for more information and course updates.
                <a href="https://khaaorestuarant.com">our Website</a>.
            </div>
        </div>
    </body>
    </html>
    `;
};
