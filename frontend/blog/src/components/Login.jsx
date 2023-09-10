import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../App";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [credentails, setCredentials] = useContext(Credentials);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await axios.post(
        "http://localhost:3000/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCredentials({
        email,password
      })
      console.log(credentails);
      console.log(data);
      toast.success(data.data.message);
      if (data.data.success) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setError(error);
      toast.error(data.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} action="submit" className="text-center login-form">
  {error && <h2 className="error-message">Error occurred</h2>}

  <input
    onChange={(e) => {
      setEmail(e.target.value);
    }}
    type="text"
    placeholder="Enter Email"
    className="input-field"
  />
  <input
    onChange={(e) => {
      setPassword(e.target.value);
    }}
    type="password"
    placeholder="Enter Password"
    className="input-field"
  />
  <button type="submit" className="login-button">
    Login
  </button>
</form>
  
  );
};

export default Login;
