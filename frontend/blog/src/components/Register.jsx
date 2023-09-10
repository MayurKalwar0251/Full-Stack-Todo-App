import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Credentials } from "../App";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [credentails, setCredentials] = useContext(Credentials);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
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
      toast.success(data.data.message);
      if (data.data.success) {
        navigate("/");
      } else {
        navigate("/register");
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} action="submit" className="text-center login-form">
    {error && <h2 className="error-message">Error Occurred</h2>}
    <input
      onChange={(e) => {
        setName(e.target.value);
      }}
      type="text"
      placeholder="Enter Name"
      className="input-field"
    />
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
      Register
    </button>
  </form>
  );
};

export default Register;
