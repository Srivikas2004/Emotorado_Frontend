import React from "react";
import axios from "axios";
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from "./api";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const responseGoogle = async (authResult) => {
        try {
            if (authResult?.code) {
                const result = await googleAuth(authResult['code']);
                console.log("API Response:", result);
                if (!result || !result.data) {
                    throw new Error("Invalid API response: result or result.data is undefined.");
                }
                const { email, name } = result.data.user;
                const token = result.data.token;
                console.log(token);
                const obj = { email, name, token };
                localStorage.setItem('user-info', JSON.stringify(obj))
                navigate('/dashboard');
                console.log('User Info:', result.data.user);

            }
            else {
                console.log('No authorization code received');
            }

        }
        catch (err) {
            console.log("Error while requesting Google Code: ", err);
        }
    }
    const googleauth = useGoogleLogin({

        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    const handleSignIn = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://emotorado-backend.onrender.com/auth/login", { email, password },{
                headers: { "Content-Type": "application/json" }});
            console.log("Login API Response:", res);

            if (res && res.data) {
                const { token, name, email } = res.data;
                localStorage.setItem("user-info", JSON.stringify({ token, name, email }));
    
                console.log("Stored Token:", localStorage.getItem("user-info"));
                navigate("/dashboard");
            } else {
                throw new Error("Invalid response from server");
            }
        
        
        } catch (err) {
         
                alert(err.response.data.message);
            
        }
    };
    return (

        <>

            <div className="section2_top">
                <div>
                    <h1>Sign In</h1>
                    <p>Sign in to your account</p>
                </div>
                <div className="auth">
                    <div className="google" onClick={googleauth}>

                        <div>
                            <FcGoogle />
                        </div>
                        <div>Sign in with Google</div>

                    </div>
                    <div className="google">
                        <div>
                            <FaApple />
                        </div>
                        <div>Sign in with Apple</div>
                    </div>
                </div>
                <div>

                </div>
                <form onSubmit={handleSignIn} className="login-form">
                <label>Email address</label>
                    <div>
                        
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <label>Password</label>
                    <div>
                        
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>


                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>


                    <button type="submit" className="sign-in-btn">Sign In</button>
                </form>
                <div className="part">
                    Don't have an account? <Link onClick={() => console.log("")}>
                        <span>Register here</span></Link>
                </div>

            </div>
        </>
    )
}

export default Login;