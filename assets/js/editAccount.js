//SEARCH
function searchTable() {
  const input = document.getElementById("searchInput").value.toUpperCase();
  const studentTable = document.getElementById("student").querySelector("table");
  const counselorTable = document.getElementById("counselor").querySelector("table");
  const studentRows = studentTable.getElementsByTagName("tr");
  const counselorRows = counselorTable.getElementsByTagName("tr");

  // Loop through student table rows and hide those that do not match the search query
  for (let i = 1; i < studentRows.length; i++) { // Start from 1 to skip the table header row
    const studentColumns = studentRows[i].getElementsByTagName("td");
    let shouldDisplay = false;
    for (let j = 0; j < studentColumns.length; j++) {
      const text = studentColumns[j].innerText.toUpperCase();
      if (text.indexOf(input) > -1) {
        shouldDisplay = true;
        break;
      }
    }
    studentRows[i].style.display = shouldDisplay ? "" : "none";
  }

  // Loop through counselor table rows and hide those that do not match the search query
  for (let i = 1; i < counselorRows.length; i++) { // Start from 1 to skip the table header row
    const counselorColumns = counselorRows[i].getElementsByTagName("td");
    let shouldDisplay = false;
    for (let j = 0; j < counselorColumns.length; j++) {
      const text = counselorColumns[j].innerText.toUpperCase();
      if (text.indexOf(input) > -1) {
        shouldDisplay = true;
        break;
      }
    }
    counselorRows[i].style.display = shouldDisplay ? "" : "none";
  }
}





//DELETE
  function deleteRecord(idNumber, accountType) {
    if (confirm('Are you sure you want to delete this record?')) {
      fetch(`/delete/${accountType}/${idNumber}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          alert('Record deleted successfully!');
          // Optionally, you can reload the page to refresh the table
          location.reload();
        } else {
          alert('Failed to delete the record.');
        }
      })
      .catch(error => {
        console.error('Error deleting record:', error);
        alert('An error occurred while deleting the record.');
      });
    }
  }

//EDIT

  // Edit function to display data in the input fields
function editRecord(idNumber, accountType) {
  fetch(`/getRecord/${accountType}/${idNumber}`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
      // Fill the input fields with the data received from the server
      document.getElementById("editAccountType").value = accountType;
      document.getElementById("hiddenIdNumber").value = idNumber;
      document.getElementById("editLastName").value = data.lastName;
      document.getElementById("editFirstName").value = data.firstName;
      document.getElementById("editBirthDate").value = data.birthDate;
      document.getElementById("editGender").value = data.gender;
      document.getElementById("editEmail").value = data.email;
      document.getElementById("editPassword").value = data.password;
      document.getElementById("editPhoneNumber").value = data.phoneNumber;

      // Show the edit form
      document.getElementById("editForm").style.display = "block";
    })
    .catch(error => {
      console.error('Error fetching record for editing:', error);
      alert('An error occurred while fetching the record for editing.');
    });
}

// Update function to send the updated data to the server
document.getElementById("updateForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const idNumber = formData.get("editIdNumber");
  const accountType = formData.get("accountType"); // Get the accountType from the form data

  fetch(`/update/${accountType}/${idNumber}`, {
    method: 'PUT',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (response.ok) {
        alert('Record updated successfully!');
        // Optionally, you can reload the page to refresh the table
        location.reload();
      } else {
        alert('Failed to update the record.');
      }
    })
    .catch(error => {
      console.error('Error updating record:', error);
      alert('An error occurred while updating the record.');
    });
});
 