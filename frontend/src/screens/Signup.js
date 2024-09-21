import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { notification } from 'antd'; // Import Ant Design's notification component
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import 'antd/dist/reset.css'; // Import Ant Design's CSS

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json();
        
        if (json.success) {
            notification.success({
                message: 'Signup Successful',
                description: 'You have been successfully signed up. Redirecting to login page...',
                placement: 'topRight',
                duration: 3, // Duration before auto-close
                style: { marginTop: '20px' } // Adjust margin to position the notification
            });
            
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after a short delay
            }, 1500);
        } else {
            notification.error({
                message: 'Signup Failed',
                description: 'Enter valid credentials and try again.',
                placement: 'topRight',
                duration: 2, // Duration before auto-close
                style: { marginTop: '20px' } // Adjust margin to position the notification
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
                    <h1 className='signup'>Signup</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
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
                    <div className="mb-3">
                        <label htmlFor="exampleInputGeolocation1" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onChange}
                            id="exampleInputGeolocation1"
                        />
                    </div>
                    <button type="submit" className="m-3 btn" style={{color:'white',backgroundColor: 'green', borderRadius: '10px',fontWeight:'500' }}>
  Submit
</button>
          <Link to="/login" className="m-3 btn btn-danger" style={{borderRadius: '10px', fontWeight:'500' }}>
           Already a User
                    </Link>
                </form>
            </div>
        </div>
    );
}
