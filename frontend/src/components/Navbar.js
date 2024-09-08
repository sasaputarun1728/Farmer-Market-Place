import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useCart, useDispatchCart } from "./ContextReducer";
import { notification } from "antd";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const cartItems = useCart();
  const dispatch = useDispatchCart(); // Get the dispatch function
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const uniqueItemCount = cartItems.length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const fetchUserDetails = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "DROP" }); // Clear the cart

    notification.info({
      message: "Logged Out",
      description: "You have been logged out successfully.",
      placement: "top",
      className: "custom-notification",
      duration: 3, // Display for 3 seconds
    });

    // Delay navigation to login page
    setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 seconds delay
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-green custom-navbar animate-navbar">
      <div className="container-fluid">
        {/* Updated link with image instead of text */}
        <Link
          className="navbar-brand fs-1 fst-italic custom-brand animate-logo"
          to="/"
        >
          <img
            src="/caorousel/img3.jpg"
            alt="Farmer Market Place Logo"
            className="custom-logo"
            style={{ height: "70px", width: "auto" }} // Adjust dimensions
          />
        </Link>
        <button
          className="navbar-toggler animate-toggle"
          type="button"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <FaTimes style={{ color: "Black" }} />
          ) : (
            <FaBars style={{ color: "Black" }} />
          )}
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link custom-link animate-link"
                aria-current="page"
                to="/"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className="nav-link custom-link animate-link"
                  to="/myOrder"
                  onClick={toggleMenu}
                >
                  My Orders
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                className="nav-link custom-link animate-link"
                to="/contact"
                onClick={toggleMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center ms-auto">
            <Link
              className="btn position-relative me-3 custom-cart-btn"
              to="/cart"
            >
              <FaShoppingCart size={30} style={{ color: "white" }} />
              {uniqueItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-badge">
                  {uniqueItemCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="position-relative">
                <button
                  className="btn custom-profile-btn animate-button"
                  onClick={toggleProfile}
                >
                  <FaUserCircle size={35} style={{ color: "white" }} />
                </button>
                {isProfileOpen && (
                  <div
                    className="profile-menu position-absolute end-0 mt-2 bg-white border rounded p-3 shadow-lg"
                    ref={profileMenuRef}
                  >
                    <div className="profile-details mb-3">
                      <h5>{userDetails.name}</h5>
                      <p>{userDetails.email}</p>
                    </div>
                    <button
                      className="btn btn-danger w-100 custom-logout-btn"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  className="btn btn-light text-success mx-1 custom-login-btn animate-button"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-light text-success mx-1 custom-signup-btn animate-button"
                  to="/createuser"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
