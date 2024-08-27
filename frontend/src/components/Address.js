import React, { useState } from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { useNavigate } from 'react-router-dom';
import { message, Button, Input, Form } from 'antd';
import './Address.css'; // Import custom CSS for styling

export default function Address() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: '',
    });

    const cartItems = useCart();
    const dispatch = useDispatchCart();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const userEmail = localStorage.getItem("userEmail");
        console.log("User Email:", userEmail);
        console.log("Form Data:", formData);

        try {
            const response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_data: cartItems,
                    email: userEmail,
                    order_date: new Date().toDateString(),
                    shipping_info: formData,
                }),
            });

            console.log("Response:", response);

            if (response.ok) {
                message.success('Your order has been placed successfully!');
                dispatch({ type: 'DROP' }); // Clear the cart
                navigate('/order-confirmation'); // Redirect to the order confirmation page
            } else {
                message.error('Failed to place order.');
            }
        } catch (error) {
            console.error("Error:", error);
            message.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="address-container">
            <h2 className="address-title">Shipping Address</h2>
            <Form className="address-form" onSubmitCapture={handleSubmit}>
                <Form.Item label="First Name">
                    <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="Last Name">
                    <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="Street Address">
                    <Input
                        id="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Street Address"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="Apartment, suite, etc. (optional)">
                    <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="Apartment, suite, etc. (optional)"
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="City">
                    <Input
                        id="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="State">
                    <Input
                        id="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="ZIP Code">
                    <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="ZIP Code"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="Country">
                    <Input
                        id="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <Form.Item label="Phone">
                    <Input
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        className="address-input"
                    />
                </Form.Item>

                <div className="address-submit">
                    <Button type="primary" htmlType="submit" className="address-submit-button">
                        Place Order
                    </Button>
                </div>
            </Form>
        </div>
    );
}
