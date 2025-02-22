import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    // Extract token from URL
    const token = new URLSearchParams(location.search).get("token");

    useEffect(() => {
        if (!token) {
            alert("Invalid or expired token");
            navigate("/forgot-password"); // Redirect to forgot password page
        }
    }, [token, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const res = await axios.post("https://emotorado-backend.onrender.com/auth/reset-password", { newPassword, token });
            alert(res.data.message);
            navigate("/login"); // Redirect to login after successful reset
        } catch (err) {
            alert(err.response?.data?.message || "Error resetting password");
        }
    };

    return (
        <div className="reset-form">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword} >
                <input
                className="reset-forminput"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    className="reset-forminput"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button  className="reset-formbutton" type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
