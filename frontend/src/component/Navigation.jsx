import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaSearch, FaUser} from "react-icons/fa";
import ProfileModel from "./ProfileModel";
import logo from "../assets/logo.jpg";

function Navigation({ loggedIn, onLogout,user }) {
  const navigate = useNavigate();
const [showProfile, setShowProfile] =useState(false);
  const handleLogin = () => {
    navigate("/login");
  };

  const handleOpenDashboard = () => {
    navigate("/analysis");
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <>
      {}<div className="top-bar">
        <Container>
          <div className="top-content">
            <div className="left-info">
              <span>
                <FaPhoneAlt /> +91 2345-3456
              </span>
              <span>
                <FaMapMarkerAlt /> 206 Market St, Melbourne, Australia
              </span>
              <span>
                <FaEnvelope /> info@gmail.com
              </span>
            </div>
            <div className="right-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaPinterestP />
              <FaLinkedinIn />
            </div>
          </div>
        </Container>
      </div>

      <Navbar expand="lg" bg="white" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo" className="logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/#about">About</Nav.Link>
              <Nav.Link as={Link} to="/#testimonials">Testimonials</Nav.Link>
              <Nav.Link as={Link} to="/#contact">Contact</Nav.Link>
            </Nav>

            <div className="nav-right d-flex align-items-center gap-3">
              <FaSearch className="search-icon" />

              {loggedIn ? (
                <button type="button" className="user-icon-btn" onClick={() => setShowProfile(true)} title="View Profile" aria-label="View Profile">
                  <FaUser />
                </button>
              ) : (
                <Button variant="primary" className="login-btn" onClick={handleLogin}>
                  Login
                </Button>
              )}
              <ProfileModel show={showProfile} handleClose={() => setShowProfile(false)} profile={user} onLogout={handleLogout} />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
