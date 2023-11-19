const expandableRows = document.querySelectorAll('.expandable-row');

expandableRows.forEach(row => {
    row.addEventListener('click', () => {
        const dropdown = row.nextElementSibling.querySelector('.dropdown-content');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});

function saveDepartments(email) {
  console.log('Clicked "Save" for email:', email);
  const checkboxes = document.querySelectorAll('input[name="department"]:checked');
  const selectedDepartments = Array.from(checkboxes).map(checkbox => checkbox.value);

  // Prepare the data to send to the server
  const data = {
      email: email,
      departments: selectedDepartments
  };

  // Make an HTTP POST request to your server
  fetch('/updateDepartments', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
        console.log('Departments updated successfully');
        alert('Departments Updated Successfully!');
    } else {
        console.error('Failed to update departments. Response:', response);
    }
})
  .catch(error => {
      console.error('Error:', error);
  });
}