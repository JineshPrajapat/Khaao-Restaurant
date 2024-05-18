exports.contactTemplate = ( name, email, phoneNumber, inquiry, message ) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Contact Inquiry Email</title>
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
            <a href=""><img class="logo" src="https://res.cloudinary.com/dqvkis3qg/image/upload/v1716028490/Restaurant/logo_lkmlur.png" alt="Your Logo" /></a>
            <div class="message">Contact Inquiry</div>
            <div class="body">
              <p>Dear ${name},</p>
              <p class="para">We've received a new inquiry:</p>
              <p class="paras"><span class="highlight">Name:</span> ${name}</p>
              <p class="paras"><span class="highlight">Email:</span> ${email}</p>
              <p class="paras"><span class="highlight">Phone Number:</span> ${phoneNumber}</p>
              <p class="paras"><span class="highlight">Inquiry Type:</span> ${inquiry}</p>
              <p class="paras"><span class="highlight">Message:</span></p>
              <p>${message}</p>
              <p class="para">Best regards,</p>
              <p>Khaao Restaurant</p>
            </div>
            <div class="info">
              For any further assistance or inquiries, please contact us at
              <a href="mailto:contact@yourwebsite.com">contact@ykhaaorestuarant.com</a>.
            </div>
            <div class="info">
              You can also visit our website for more information and contact details.
              <a href="https://yourwebsite.com">Your Website</a>.
            </div>
          </div>
        </body>
      </html>
    `;
  };
  