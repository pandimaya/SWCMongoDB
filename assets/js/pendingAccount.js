// Function to accept an account and move data from pending to students/counselors collection
async function acceptAccount(idNumber, accountType) {
    try {
      const response = await fetch('/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idNumber, accountType }),
      });

      const result = await response.json();
      alert(result.message);
      location.reload(); // Refresh the page after accepting the account
    } catch (error) {
      console.error('Error accepting account:', error);
      alert('An error occurred while accepting the account.');
    }
  }

  // Function to reject an account and delete data from pending collection
  async function rejectAccount(idNumber, accountType) {
    try {
      const response = await fetch('/reject', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idNumber, accountType }),
      });

      const result = await response.json();
      alert(result.message);
      location.reload(); // Refresh the page after rejecting the account
    } catch (error) {
      console.error('Error rejecting account:', error);
      alert('An error occurred while rejecting the account.');
    }
  }