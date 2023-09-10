import React, { useEffect } from 'react'

const TodoArray = () => {
    async function getTodos() {
        let data = await axios.get("http://localhost:3000/tasks/getTasks", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentails.email}:${credentails.password}`,
          },
        });
        console.log(data);
      }
    useEffect(
        ()=>{
            getTodos
        },[]
    )
  return (
    <div>
      Todo
    </div>
  )
}

export default TodoArray
