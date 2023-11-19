document.addEventListener('DOMContentLoaded', function () {
    // Function to handle accepting an appointment
    function completeAppointment(appointmentId) {
      fetch(`/completeAppointment/${appointmentId}`, {
        method: 'POST',
      })
      .then(response => {
        if (response.ok) {
          alert('Appointment complete successfully!'); // Show a notification
  
          // After a short delay (you can adjust the delay as needed), refresh the page
          setTimeout(() => {
            window.location.reload(); // Refresh the page
          }, 1000); // 1000 milliseconds = 1 second
        } else {
          console.error('Failed to accept the appointment');
        }
      })
      .catch(error => {
        console.error('Error accepting the appointment:', error);
        // Handle the error or show a message to the user
      });
    }
  
    // Event delegation to handle 'Accept' button clicks
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('btn-success')) {
        const appointmentId = event.target.dataset.appointmentId;
        completeAppointment(appointmentId);
      }
    });
  });
  