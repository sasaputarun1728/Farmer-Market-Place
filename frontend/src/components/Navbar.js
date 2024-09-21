import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart, useDispatchCart } from "./ContextReducer";
import { notification } from "antd";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const uniqueItemCount = cartItems.length;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "DROP" });
    notification.info({
      message: "Logged Out",
      description: "You have been logged out successfully.",
      placement: "top",
      duration: 3,
    });
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand custom-brand" to="/">
          <img src="/caorousel/img3.jpg" alt="Logo" className="custom-logo" />
        </Link>
        <div className="navbar-icons">
          {isLoggedIn && (
            <Link className="custom-cart-btn" to="/cart">
              <FaShoppingCart size={28} />
              {uniqueItemCount > 0 && (
                <span className="badge">{uniqueItemCount}</span>
              )}
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link className="btn btn-outline-light me-2 custom-btn" to="/login">Login</Link>
              <Link className="btn btn-outline-light me-2 custom-btn" to="/createuser">Signup</Link>
            </>
          )}
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={30}/> : <FaBars />}
          </button>
        </div>

        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={toggleMenu}>
            <FaTimes />
          </button>
          <ul className="sidebar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={toggleMenu}>Home</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/myOrder" onClick={toggleMenu}>My Orders</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={toggleMenu}>Contact Us</Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/add-farmer-details" onClick={toggleMenu}>
                  Add your item to sell
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/FarmerDashboard" onClick={toggleMenu}>
                  Manage Products
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
