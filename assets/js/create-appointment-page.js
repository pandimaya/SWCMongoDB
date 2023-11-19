
function insertRecord() {
  // Get the form values (date, time, service)
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const service = document.getElementById('service').value;

  // Get the current date and time when the "appoint" button is clicked
  const appointmentDateTime = new Date();

  // Send the data to the server using AJAX or fetch
  fetch('/create-appointment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date,
      time,
      service,
      appointmentDateTime,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response from the server
      if (data.success) {
        // Display a success message or redirect to a confirmation page
        alert('Appointment Created Successfully');
        console.log('Appointment created successfully');
      } else {
        // Handle errors or display an error message
        alert('Appointment Creation Failed');
        console.error('Appointment creation failed');
      }
    })
    .catch((error) => {
      // Handle any errors that occur during the fetch
      console.error('Error:', error);
    });
}
