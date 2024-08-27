import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined // Import WhatsApp icon
} from "@ant-design/icons";
import NavBar from "./Navbar"; // Import the NavBar component
import "./Contact.css"; // Import your custom CSS

export default function Contact() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Display notification
    notification.success({
      message: "Message Sent",
      description: "Thank you for contacting us. We will get back to you soon!",
      placement: "topRight",
    });

    // Simulate a delay before navigating to the home page
    setTimeout(() => {
      navigate("/");
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div>
      <NavBar /> {/* Include the NavBar at the top */}
      <div className="contact-container">
        <div className="contact-details">
          <h1>Contact</h1>
          <p>
            <MailOutlined />{" "}
            <a href="mailto:sasaputarun9398@gmail.com">
              sasaputarun9398@gmail.com
            </a>
          </p>
          <p>
            <PhoneOutlined /> <a href="tel:+919398626813">+91 9398626813</a>
          </p>
          

          <h3>Connect with me:</h3>
          <p>
            <WhatsAppOutlined />{" "}
            <a
              href="https://wa.me/919398626813"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </p>
          <p>
            <InstagramOutlined />{" "}
            <a
              href="https://www.instagram.com/sasapu_tarun/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
          <p>
            <TwitterOutlined />{" "}
            <a
              href="https://twitter.com/TSasapu24242"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </p>
        </div>

        <div className="contact-form-section">
          <h1>Send a Message</h1>
          <Form className="contact-form" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
