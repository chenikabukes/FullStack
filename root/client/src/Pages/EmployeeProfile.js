import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EmployeeProfile() {
  // Access the employee ID from the URL parameters
  const { id } = useParams(); // Use useParams hook

  const [employeeData, setEmployeeData] = useState({}); // Initialize as an object, not an array

  useEffect(() => {
    // Fetch employee data from the backend when the component mounts
    fetchEmployeeData(id); // Pass the employee ID to the fetchEmployeeData function
  }, [id]); // Include id as a dependency to re-fetch data when it changes

  const fetchEmployeeData = (employeeId) => {
    // Make a GET request to retrieve employee data from the backend using the employee ID
    fetch(`http://localhost:4000/getData/${employeeId}`) // Use template literals to include the ID in the URL
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmployeeData(data); // Update the state with the retrieved employee data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div>
      <h1>Employee Profile</h1>
      <p>Employee ID: {id}</p>
      <p>Employee name: {employeeData.name}</p>
    </div>
  );
}

export default EmployeeProfile;
