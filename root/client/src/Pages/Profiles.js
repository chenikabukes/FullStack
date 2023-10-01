import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "../GeneralComponents/Navbar";
import Footer from "../GeneralComponents/Footer";
import { Link } from "react-router-dom"; // Import Link

function Profiles() {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    // Fetch staff data from the backend when the component mounts
    fetchStaffData();
  }, []);

  const fetchStaffData = () => {
    // Make a GET request to retrieve staff data from the backend
    fetch("http://localhost:4000/getData")
      .then((response) => response.json())
      .then((data) => {
        setStaffData(data); // Update the state with the retrieved staff data
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {staffData.map((employee) => (
          <Col key={employee._id}>
            <Link to={`/Pages/EmployeeProfile/${employee._id}`}>
              <Card>
                <Card.Img
                  variant="top"
                  src="https://blog.hubspot.com/hs-fs/hubfs/Untitled%20design%20%281%29-Aug-02-2022-04-20-22-53-PM.png?width=595&height=400&name=Untitled%20design%20%281%29-Aug-02-2022-04-20-22-53-PM.png"
                />
                <Card.Body>
                  <Card.Title>{employee.name}</Card.Title>
                  <Card.Text>I am {}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Profiles;
