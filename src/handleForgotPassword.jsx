import React, { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://emotorado-backend.onrender.com/auth/forgot-password", { email });
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message );
        }
    };

    return (
        <form onSubmit={handleForgotPassword} className="forgot-form">
            <h2>Forgot Password ?</h2>
            <input type="email" className="forgot-forminput" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className="forgot-formbutton">Reset Password</button>
        </form>
    );
}

export default ForgotPassword;
