import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatchCart, useCart } from "./ContextReducer";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import './ProductCard.css'; // Ensure this file imports the custom styles
import { FaAngleDown, FaAngleUp } from "react-icons/fa"; // Icons for arrow up/down

export default function ProductCard({ product }) {
  const [selectedQuantity, setSelectedQuantity] = useState(
    product?.defaultQuantity || 1
  );
  const totalPrice = product?.price * selectedQuantity || 0;
  const dispatch = useDispatchCart();
  const cartItems = useCart();
  const navigate = useNavigate();

  // State to manage visibility of cart indicator
  const [isCartVisible, setIsCartVisible] = useState(cartItems.length > 0);
  const [showFarmerDetails, setShowFarmerDetails] = useState(false); // New state for farmer details

  const isLoggedIn = !!localStorage.getItem("token");

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      message.info({
        content: "Please login to add items to the cart.",
        style: { marginTop: "20px" },
      });
      return;
    }

    dispatch({
      type: "ADD",
      id: product._id,
      name: product.productName,
      price: product.price,
      qty: selectedQuantity,
    });

    message.success({
      content: "Item added to cart successfully!",
      style: { marginTop: "20px" },
    });

    setIsCartVisible(true); // Show the cart indicator when an item is added
  };

  const handleQuantityChange = (e) => {
    setSelectedQuantity(Number(e.target.value));
  };

  useEffect(() => {
    // Update visibility based on cart items
    if (cartItems.length > 0) {
      setIsCartVisible(true);
    } else {
      setIsCartVisible(false);
    }
  }, [cartItems]);

  // Function to ensure experience has "years"
  const formatExperience = (experience) => {
    return experience.toString().includes("years")
      ? experience
      : `${experience} years`;
  };

  const toggleFarmerDetails = () => {
    setShowFarmerDetails(!showFarmerDetails);
  };

  return (
    <>
      <Card
        style={{
          width: "27rem",
          margin: "20px",
          padding: "15px",
          boxShadow: "0 20px 16px rgba(0, 0, 0, 0.15)",
          borderRadius: "12px",
          border: "1px solid white",
        }}
      >
        <Card.Img
          variant="top"
          src={product?.imageUrl || "default-image-url.jpg"}
          alt={product?.productName || "Product Image"}
          style={{
            objectFit: "cover",
            height: "220px",
            borderRadius: "12px 12px 0 0",
          }}
        />
        <Card.Body style={{ backgroundColor: "#f5f5f5", borderRadius: "0 0 12px 12px" }}>
          <Card.Title
            style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#2c3e50" }}
          >
            {product?.productName || "Product Name"}
          </Card.Title>
          <Card.Text
            style={{ color: "#7f8c8d", fontSize: "1rem", marginBottom: "12px" }}
          >
            {product?.productDetails || "Product details not available"}
          </Card.Text>
          <Card.Text style={{ fontSize: "1rem", marginBottom: "8px" }}>
            Quantity:
            <select
              value={selectedQuantity}
              onChange={handleQuantityChange}
              style={{
                marginLeft: "10px",
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #bdc3c7",
              }}
            >
              {(product?.quantityOptions || [1]).map((qty) => (
                <option key={qty} value={qty}>
                  {qty} kg
                </option>
              ))}
            </select>
          </Card.Text>
          <Card.Text
            style={{ fontWeight: "bold", color: "#34495e", fontSize: "1rem" }}
          >
            Price: {product?.price || 0} INR/kg
          </Card.Text>
          <Card.Text
            style={{ fontWeight: "bold", color: "black", fontSize: "1.3rem" }}
          >
            Total Price: {totalPrice} INR
          </Card.Text>
          <Button
            variant="primary"
            style={{
              borderRadius: "50px",
              backgroundColor: "#05ae2a",
              padding: "12px 15px",
              display: "block",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Card.Body>

        {/* Toggle Button for Farmer Details */}
        <Card.Footer
          style={{
            backgroundColor: "#f5f5f5",
            borderRadius: "0 0 12px 12px",
            textAlign: "center",
          }}
        >
          <Button
            variant="link"
            onClick={toggleFarmerDetails}
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              color: "#2980b9",
            }}
          >
            Farmer Details {showFarmerDetails ? <FaAngleUp /> : <FaAngleDown />}
          </Button>

          {/* Conditionally render the farmer details */}
          {showFarmerDetails && (
            <div style={{ fontSize: "1rem", color: "#2c3e50", marginTop: "10px" }}>
              <strong>Farmer:</strong> {product?.farmer?.name || "Unknown"}
              <br />
              <strong>Experience:</strong>{" "}
              {formatExperience(product?.farmer?.experience) || "N/A"}
              <br />
              <strong>Location:</strong> {product?.farmer?.location || "N/A"}
              <br />
              <strong>Contact:</strong>{" "}
              <a
                href={`tel:${product?.farmer?.contactNumber || ""}`}
                style={{ color: "#2980b9" }}
              >
                {product?.farmer?.contactNumber || "Not available"}
              </a>
            </div>
          )}
        </Card.Footer>
      </Card>

      {/* Cart Indicator */}
      {isCartVisible && (
        <div className="cart-indicator d-flex justify-content-between align-items-center custom-light-green text-white p-3">
          <span className="ms-3 fs-5">
            <strong>Cart:</strong> {cartItems.length} items
          </span>
          <Button
            className="me-3"
            variant="light"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </Button>
        </div>
      )}
    </>
  );
}
