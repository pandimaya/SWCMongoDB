document.addEventListener('DOMContentLoaded', function () {
    // Function to handle rejecting an appointment
    function cancelAppointment(appointmentId) {
      fetch(`/studentCancelAppointment/${appointmentId}`, {
        method: 'POST',
      })
      .then(response => {
        if (response.ok) {
          alert('Appointment cancelled successfully!');
  
          // After a short delay, refresh the page
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error('Failed to cancel the appointment');
          alert('Failed to cancel the appointment');
        }
      })
      .catch(error => {
        console.error('Error cancelling the appointment:', error);
        // Handle the error or show a message to the user
      });
    }
  
    // Event delegation to handle 'Reject' button clicks
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('cancel-appointment')) {
        const appointmentId = event.target.dataset.appointmentId;
        cancelAppointment(appointmentId);
      }
    });
  });
  