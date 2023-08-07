const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission and page refresh
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.Phone-number.value;
  const enquiry = form.enquiry.value;
  const message = form.message.value;
  // You can add more validation here if needed
  const data = {
    name: name,
    email: email,
    phone: phone,
    enquiry: enquiry,
    message: message,
  };
  // You can replace the URL with your own API endpoint to handle the form data
  fetch("https://example.com/contact-us", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Message sent successfully!");
      form.reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Something went wrong, please try again later.");
    });
});
