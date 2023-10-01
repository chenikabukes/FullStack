import React, { useState } from "react";
import "./Contact.css";
import "../App.css";

export const TextControlsExample = () => {
  var [name, setName] = useState();

  const nameUpdate = (event) => {
    // Dealing with name field changes to update our state
    setName(event.target.value);
  };

  const handleSubmit = () => {
    // Once the form has been submitted, this function will post to the backend
    const postURL = "http://localhost:4000/getData"; //Our previously set up route in the backend
    fetch(postURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // We should keep the fields consistent for managing this data later
        name: name,
        clockedIn: false,
        dates: [],
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          // The request was successful, show the alert
          alert("You have been added to the system!");
        } else {
          // Handle errors or other response statuses here
          console.error("Error:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div className="content-center">
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input required onChange={nameUpdate}></input>
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
};

export default TextControlsExample;
