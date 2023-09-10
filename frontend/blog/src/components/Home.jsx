import React, { useContext } from "react";
import { Credentials } from "../App";
import { useNavigate,Link } from "react-router-dom";
import Todos from "./Todos";

const Home = () => {
  const [credentails, setCredentials] = useContext(Credentials);
  console.log(credentails);

  return (
    <div className="text-center">
    <h1>Welcome {credentails && credentails.email}</h1>
    {!credentails && <Link to={"/login"} className="link">Login</Link>}
    {!credentails && <Link to={"/register"} className="link">Register</Link>}
    {credentails && <Todos />}
    
  </div>
    
  )
};

export default Home;
