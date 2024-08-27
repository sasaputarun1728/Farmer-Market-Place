import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MyOrder.css"; // Import the CSS file for styling

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setOrderData(data.orderData);
      } else {
        console.error("Error fetching order data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (!orderData) {
    return (
      <div>
        <Navbar />
        <div className="container3">
          <p className="text-center text-secondary">Loading orders...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Ensure orderData is an array and sort if valid
  const sortedOrders = Array.isArray(orderData.order_data)
    ? orderData.order_data.sort((a, b) => {
        const dateA = new Date(a.Order_date);
        const dateB = new Date(b.Order_date);
        return dateB - dateA; // Sort by descending date
      })
    : [];

  return (
    <div>
      <Navbar />
      <div className="container3">
        <div className="row">
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order, orderIndex) => {
              // Parse the order date and time
              const orderDateTime = new Date(order.Order_date);
              const formattedDate = orderDateTime.toLocaleDateString();
              const formattedTime = orderDateTime.toLocaleTimeString();

              // Calculate total price for all items in this order
              const totalPrice = order.items.reduce((acc, item) => {
                return acc + item.price * item.qty;
              }, 0);

              return (
                <div key={orderIndex} className="order-card mb-5">
                  <h4 className="order-date text-secondary mb-3">
                    Order Date: {formattedDate || "Unknown Date"} <br />
                    Order Time: {formattedTime || "Unknown Time"}
                  </h4>
                  <div className="row">
                    {order.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="col-12 col-md-6 col-lg-4 mb-4"
                      >
                        <div
                          className="card"
                          style={{ width: "18rem", maxHeight: "400px" }}
                        >
                          {/* Image handling can be added here if needed */}
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">
                              Qty: {item.qty !== undefined ? item.qty : "N/A"}
                            </p>
                            <p className="card-text">
                              Price: ₹
                              {item.price !== undefined ? item.price : "N/A"}/-
                            </p>
                            <p className="card-text">
                              Total: ₹
                              {item.price !== undefined &&
                              item.qty !== undefined
                                ? item.price * item.qty
                                : "N/A"}
                              /-
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="order-total-price text-center mb-3">
                    <h5>Total Price: ₹{totalPrice}</h5>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <p className="text-center text-secondary">You have no orders.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
