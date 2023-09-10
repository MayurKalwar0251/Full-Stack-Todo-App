import axios from 'axios'
import React from 'react'

const Logout = () => {

    async function handleLogout() {
        await axios.get("http://localhost:3000/users/logout",{withCredentials:true})
    }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
