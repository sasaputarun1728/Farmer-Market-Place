import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Button, Card } from "react-bootstrap";
import { useDispatchCart, useCart } from "./ContextReducer";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [selectedQuantity, setSelectedQuantity] = useState(product.defaultQuantity || 1);
  const totalPrice = product.price * selectedQuantity;
  const dispatch = useDispatchCart();
  const cartItems = useCart();
  const navigate = useNavigate();

  // State to manage visibility of cart indicator
  const [isCartVisible, setIsCartVisible] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      message.info({
        content: 'Please login to add items to the cart.',
        style: { marginTop: '20px' },
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
      content: 'Item added to cart successfully!',
      style: { marginTop: '20px' },
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
        <Card.Body>
          <Card.Title
            style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#2c3e50" }}
          >
            {product?.productName || "Product Name"}
          </Card.Title>
          <Card.Text style={{ color: "#7f8c8d", fontSize: "1rem", marginBottom: "12px" }}>
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
              {product?.quantityOptions?.map((qty) => (
                <option key={qty} value={qty}>
                  {qty} kg
                </option>
              )) || <option value="1">1 kg</option>}
            </select>
          </Card.Text>
          <Card.Text style={{ fontWeight: "bold", color: "#34495e", fontSize: "1rem" }}>
            Price: {product?.price || 0} INR/kg
          </Card.Text>
          <Card.Text style={{ fontWeight: "bold", color: "black", fontSize: "1.3rem" }}>
            Total Price: {totalPrice} INR
          </Card.Text>
          <Button
            variant="primary"
            style={{
              borderRadius: "50px",
              padding: "12px 15px",
              display: "block",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "#ecf0f1", borderRadius: "0 0 12px 12px" }}>
          <div style={{ fontSize: "1rem", color: "#2c3e50" }}>
            <strong>Farmer:</strong> {product?.farmer?.name || "Unknown"}
            <br />
            <strong>Experience:</strong> {product?.farmer?.experience || "N/A"}
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
          <div className="mt-2" style={{ fontSize: "1rem", color: "#34495e" }}>
            <strong>Rating:</strong>
            {Array.from(
              { length: Math.floor(product?.rating?.average || 0) },
              (_, i) => (
                <FaStar key={i} color="gold" style={{ marginLeft: "2px" }} />
              )
            )}
            {Array.from(
              { length: 5 - Math.floor(product?.rating?.average || 0) },
              (_, i) => (
                <FaStar
                  key={i + 5}
                  color="lightgray"
                  style={{ marginLeft: "2px" }}
                />
              )
            )}
            <span> ({product?.rating?.totalReviews || 0} reviews)</span>
          </div>
        </Card.Footer>
      </Card>

      {/* Cart Indicator */}
      {isCartVisible && (
        <div className="cart-indicator fixed-bottom d-flex justify-content-between align-items-center bg-primary text-white p-3">
          <span className="ms-3 fs-5">
            <strong>Cart:</strong> {cartItems.length} items
          </span>
          <Button
            className="me-3"
            variant="light"
            onClick={() => navigate('/cart')}
          >
            View Cart
          </Button>
        </div>
      )}
    </>
  );
}
