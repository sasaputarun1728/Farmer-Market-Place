import React from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import trash from "./trash.svg";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { message } from 'antd';  // Import antd message component
import './Cart.css';

export default function Cart() {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token"); // Replace with your actual authentication check logic

  const handleRemoveItem = (id) => {
    dispatch({ type: "REMOVE", id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "DECREASE", id });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "INCREASE", id });
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2);
  };

  const handleBuyNow = () => {
    if (isAuthenticated) {
      navigate("/address", { state: { cartItems } });
    } else {
      message.warning('Please log in to proceed with the purchase.', 3);  // Display a warning message for 3 seconds
     
    }
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div className="container2 mt-5 bg-light rounded p-4 shadow-lg">
        <h2 className="text-primary mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center">
            <MdOutlineShoppingCart size={100} className="text-secondary mb-3" />
            <p className="text-secondary">Your cart is empty.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-primary">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="align-middle">
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-danger me-2"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          disabled={item.qty <= 1}
                        >
                          <span className="fw-bold">-</span>
                        </button>
                        <div className="quantity-display mx-2">
                          {item.qty}
                        </div>
                        <button
                          className="btn btn-sm btn-success ms-2"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          <span className="fw-bold">+</span>
                        </button>
                      </div>
                    </td>
                    <td>{(item.price * item.qty).toFixed(2)} INR</td>
                    <td>
                      <img
                        src={trash}
                        alt="Delete"
                        style={{ cursor: "pointer", width: "24px", height: "24px" }}
                        onClick={() => handleRemoveItem(item.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="d-flex flex-column flex-md-row justify-content-between mt-3">
          <h4 className="text-success fw-bold mb-2 mb-md-0">
            <strong>Total Price: {calculateTotalPrice()} INR</strong>
          </h4>
          {cartItems.length > 0 && (
            <button
              className="btn btn-primary mt-2 mt-md-0"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </>
  );
}
