document.addEventListener('DOMContentLoaded', function () {
  const returnToLoginButton = document.getElementById('returnToLoginButton');
  const createAccountButton = document.getElementById('createAccountButton');
  const accountTypeSelect = document.getElementById('accountType');
  const departmentDropdown = document.getElementById('departmentDropdown');

  returnToLoginButton.click(function() {
    var loginPageURL = '/LoginPage';
    // Navigate to the login page
    window.location.href = loginPageURL;
  });

  if (createAccountButton && accountTypeSelect) {
    createAccountButton.addEventListener('click', handleRegistration);

    // Check the initial account type selection and set the visibility of the department dropdown
    if (accountTypeSelect.value === 'Student') {
      departmentDropdown.style.display = 'block';
    }
    accountTypeSelect.addEventListener('change', handleAccountTypeChange);
  }
  function handleAccountTypeChange() {
    const selectedAccountType = accountTypeSelect.value;
    if (selectedAccountType === 'Student') {
      // Show the department dropdown and hide the checklist
      departmentDropdown.style.display = 'block';
      departmentChecklist.style.display = 'none';
    } else {
      // Hide both if none selected
      departmentDropdown.style.display = 'none';
    }
  }
});

function handleRegistration() {
  // Get form data
  const firstName = document.querySelector('#firstName').value;
  const lastName = document.querySelector('#lastName').value;
  const birthDate = document.querySelector('#birthdayDate').value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const idNumber = document.querySelector('#IDnumber').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;
  const accountType = document.querySelector('#accountType').value;
  const departmentSelect = document.querySelector('#departmentSelect').value;

  // Regular expressions for validation
  const nameRegex = /^[a-zA-Z\s]+$/; // Only alphabetic characters
  const phPhoneNumberRegex = /^\+639\d{9}$/; // Philippine phone number format
  const dlsudEmailRegex = /^[\w-]+@dlsud\.edu\.ph$/; // DLSUD email format

  // Perform form validation
  if (
    !firstName ||
    !lastName ||
    !birthDate ||
    !email ||
    !password ||
    !idNumber ||
    !phoneNumber
  ) {
    alert('Please fill out all required fields.');
    return; // Prevent form submission
  }

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert('First Name and Last Name should only contain alphabetic characters.');
    return; // Prevent form submission
  }

  if (!phPhoneNumberRegex.test(phoneNumber)) {
    alert('Please enter a valid Philippine phone number (+639xxxxxxxxx).');
    return; // Prevent form submission
  }

  if (!dlsudEmailRegex.test(email)) {
    alert('Please enter a valid DLSUD email address (e.g., yourname@dlsud.edu.ph).');
    return; // Prevent form submission
  }

  

  // Create a user object with form data
  const user = {
    firstName,
    lastName,
    birthDate,
    gender,
    email,
    password,
    idNumber,
    phoneNumber,
    accountType,
    departmentSelect,
  };

  // Send the user data to the server
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        const successMessage = document.querySelector('#successMessage');
        successMessage.style.display = 'block';
        const form = document.querySelector('#insertForm');
        form.style.display = 'none';
      } else {
        alert('Registration failed. Please try again.');
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      console.error('Error:', error);
      alert('Email may have been used already OR have not yet confirmed');
    });
}
