import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup({onRegisterClick}) {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axios.post("https://emotorado-backend.onrender.com/auth/signup", formData);
            alert(res.data.message);
            onRegisterClick(false); 
        } catch (err) {
            if (err.response?.status === 400) {
                alert("User already exists. Redirecting to login...");
                onRegisterClick(false);  
            } else {
                alert(err.response?.data?.message || "Registration failed");
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup} className="signup-form">
                <input type="text" className="signup-forminput" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" className="signup-forminput" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" className="signup-forminput" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" className="signupbutton">Sign Up</button> </form>
            <p>Already have an account? <Link onClick={onRegisterClick}>Login here</Link></p>
        </div>
    );
}

export default Signup;
