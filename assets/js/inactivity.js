document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, 20 * 60 * 1000); // 20 minutes
}

function logout() {
  // Perform logout actions here
  // For example, you can clear the user's session or log them out on the server-side
  // Then, redirect the user to the login page or perform any other necessary actions
  window.location.href = "/logout"; // Redirect to the logout route on your server
}