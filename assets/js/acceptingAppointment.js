document.addEventListener('DOMContentLoaded', function () {
  
  let currentAppointmentId; // Store the current appointmentId globally

  // Event delegation to handle 'Accept' and 'Confirm Accept' button clicks
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('accept-appointment')) {
      // Show the modal when clicking the "Accept" button
      currentAppointmentId = event.target.dataset.appointmentId;
      $('#acceptModal').modal('show');
    } else if (event.target.classList.contains('confirm-accept')) {
      // Get the remarks from the modal input
      const remarks = document.getElementById('modalRemarkInput1').value;

      // Call the function to accept the appointment with remarks
      acceptAppointment(currentAppointmentId, remarks);
    }
  });

  // Function to handle Accepting an appointment
  function acceptAppointment(appointmentId, remarks) {
    fetch(`/acceptAppointment/${appointmentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ remarks }),
    })
    .then(response => {
      if (response.ok) {
        alert('Appointment accepted successfully!');

        // After a short delay, refresh the page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        console.error('Failed to accept the appointment');
      }
    })
    .catch(error => {
      console.error('Error accepting the appointment:', error);
      // Handle the error or show a message to the user
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle refreshing the page
  function refreshPage() {
    // You can customize this function based on your needs
    window.location.reload();
  }

  // Event delegation to handle modal close button clicks
  document.addEventListener('click', function (event) {
    // Check if the clicked element or its ancestor has the ID "closeModalBtn"
    if (event.target.id === 'closeModalBtn' || event.target.closest('#closeModalBtn')) {
      // Add your logic here before refreshing (if needed)
      refreshPage();
    } else if (event.target.id === 'closeModaX'|| event.target.closest('#closeModalX')) {
      refreshPage();
    }
  });
});

