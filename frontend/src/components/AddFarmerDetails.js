import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { message } from "antd"; // Import Ant Design message component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./AddFarmerDetails.css"; // Import the CSS file for styling

function AddFarmerDetails() {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    productDetails: "",
    quantityOptions: "",
    defaultQuantity: "",
    price: "",
    farmer: {
      name: "",
      experience: "",
      location: "",
      age: "",
      contactNumber: "",
    },
    imageUrl: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    if (field) {
      setFormData((prevState) => ({
        ...prevState,
        [section]: {
          ...prevState[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://farmer-market-place.onrender.com/api/addFarmerDetails",
        {
          ...formData,
          quantityOptions: formData.quantityOptions
            .split(",")
            .map((num) => parseInt(num.trim(), 10)),
        }
      );
  
      // Display success message
      message.success("Farmer details added successfully!");
  
      // Clear the form fields
      setFormData({
        productName: "",
        category: "",
        productDetails: "",
        quantityOptions: "",
        defaultQuantity: "",
        price: "",
        farmer: {
          name: "",
          experience: "",
          location: "",
          age: "",
          contactNumber: "",
        },
        imageUrl: "",
      });
  
      // Navigate to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000); // 3000 milliseconds = 3 seconds
  
    } catch (error) {
      console.error(error);
      // Display error message
      message.error("Error adding farmer details. Please try again.");
    }
  };
  

  return (
    <div className="form-container1 mt-5">
      <h2 className="form-header mb-4">Add Farmer Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="productDetails">
          <Form.Label>Product Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product details"
            name="productDetails"
            value={formData.productDetails}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="quantityOptions">
              <Form.Label>Quantity Options (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 50, 100, 200"
                name="quantityOptions"
                value={formData.quantityOptions}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="defaultQuantity">
              <Form.Label>Default Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter default quantity"
                name="defaultQuantity"
                value={formData.defaultQuantity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <h4 className="section-header">Farmer Details</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="farmerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter farmer's name"
                name="farmer.name"
                value={formData.farmer.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="farmerExperience">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 9 years"
                name="farmer.experience"
                value={formData.farmer.experience}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="farmerLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter farmer's location"
                name="farmer.location"
                value={formData.farmer.location}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="farmerAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter farmer's age"
                name="farmer.age"
                value={formData.farmer.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="farmerContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter contact number"
                name="farmer.contactNumber"
                value={formData.farmer.contactNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="imageUrl">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddFarmerDetails;
