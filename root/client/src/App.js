import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profiles from "./Pages/Profiles";
import Home from "./Pages/Home";
import Features from "./Pages/Features";
import Pricing from "./Pages/Pricing";
import EmployeeProfile from "./Pages/EmployeeProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import TextControlsExample from "./Pages/Contact";
import Navbar from "./GeneralComponents/Navbar";
import Footer from "./GeneralComponents/Footer";
import "./App.css";

function App() {
  return (
    <div className="page-container">
      <Navbar />
      <Router>
        <div className="content-wrap">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/Pages/Home" element={<Home />} />
            <Route path="/Pages/Profiles" element={<Profiles />} />
            <Route
              path="/Pages/EmployeeProfile/:id"
              element={<EmployeeProfile />}
            />
            <Route path="/Pages/Features" element={<Features />} />
            <Route path="/Pages/Pricing" element={<Pricing />} />
            <Route path="/Pages/Contact" element={<TextControlsExample />} />
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
