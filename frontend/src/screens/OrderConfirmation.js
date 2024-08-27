import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="container2 mt-5 d-flex flex-column align-items-center justify-content-center">
      <div className="confirmation-card shadow-lg p-5 rounded bg-white text-center">
      <h2 className="text-success mb-4">🎉 Your Order Has Been Placed!</h2>
        <p className="lead mb-4">
          Thank you for your purchase! Your order is being processed. 📦 You will receive a confirmation email shortly. ✉️
        </p>
        <Button 
          type="primary" 
          size="large" 
          onClick={handleReturnHome} 
          className="btn-lg"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
}
