import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "antd/dist/reset.css";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      // Store the user's email, token, and name in localStorage
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("token", json.token);
      localStorage.setItem("userName", json.name);  // Store user name

      notification.success({
        message: "Login Successful",
        description: "You have been successfully logged in.",
        placement: "topRight",
        duration: 2,
        style: { marginTop: "20px" },
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      notification.error({
        message: "Login Failed",
        description: "Incorrect email or password.",
        placement: "topRight",
        duration: 2,
        style: { marginTop: "20px" },
      });
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h1 className="login">Login</h1>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <div className="password-container" style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={onChange}
                id="exampleInputPassword1"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <button type="submit" className="m-3 btn" style={{color:'white', backgroundColor: 'green', borderRadius: '5px',fontWeight:'500' }}>
  Submit
</button>
          <Link to="/createuser" className="m-3 btn btn-danger " style={{  borderRadius: '5px',fontWeight:'500' }}>
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
  );
}
