// async function displayEmployeeRecords() {
//     try {
//       const response = await fetch("/get_students");

//       if (response.ok) {
//         const students = await response.json();
//         const tableBody = document.getElementById("appointmentTableBody");

//         students.forEach((student) => {
//           const row = document.createElement("tr");
//           row.innerHTML = `
//             <td>${student.studid}</td>
//             <td>${student.fname}</td>
//             <td>${student.date}</td>
//             <td>${student.time}</td>
//             <td>${student.service}</td>
//           `;
//           tableBody.appendChild(row);
//         });
//       } else {
//         const errorMessage = await response.text();
//         alert(`Error: ${errorMessage}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while fetching employee records.");
//     }
//   }

//   // Call the displayEmployeeRecords function when the page loads
//   window.addEventListener("load", displayEmployeeRecords);

  async function displayEmployeeRecords() {
    try {
      const response = await fetch("/get_students");

      if (response.ok) {
        const students = await response.json();
        const tableBody = document.getElementById("appointmentTableBody");

        students.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${student.studid}</td>
            <td>${student.fname}</td>
            <td>${student.date}</td>
            <td>${student.time}</td>
            <td>${student.service}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteAppointment('${student.studid}')">Reject</button></td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching employee records.");
    }
  }

  // Call the displayEmployeeRecords function when the page loads
  window.addEventListener("load", displayEmployeeRecords);

  // Function to handle appointment deletion
  async function deleteAppointment(studid) {
    try {
      const response = await fetch("/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studid }), // Send the student ID to be deleted
      });

      if (response.ok) {
        alert("Appointment deleted successfully!");
        // Refresh the page to update the table after deletion
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the appointment.");
    }
  }