import axios from 'axios'
import React, { useEffect } from 'react'



const Profile = () => {
  useEffect(async () => {
    try {
      let response = await axios.get("http://localhost:3000/users/me", { withCredentials: true });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
