import React,{useState} from "react";
import Section1 from "./Section1";
import Login from "./Login";
import Signup from "./Signup";
function Register() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="register">
      
        <Section1 />
      
      
        {showSignup ? <Signup onRegisterClick={() => setShowSignup(false)}/> : <Login onRegisterClick={() => setShowSignup(true)} />}
  
    </div>
  );
}

export default Register;
