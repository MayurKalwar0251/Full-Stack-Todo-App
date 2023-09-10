import { useContext, useEffect, useState } from "react";
import { Credentials } from "../App";
import axios from "axios";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [credentails, setCredentials] = useContext(Credentials);

  const [todoText, setTodoText] = useState("");
  const [refresh,setRefresh] = useState(false)

  async function getTodos() {
    let data = await axios.get("http://localhost:3000/tasks/getTasks", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentails.email}:${credentails.password}`,
      },
    });
    setTodos(data.data.message);
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!todoText) {
      return;
    }

    let newTodo = [...todos, { checked: false, title: todoText }];
    

    let data = await axios.post(
      "http://localhost:3000/tasks/add",
      {
        newTodo,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentails.email}:${credentails.password}`,
        },
      }
    );
    const  updatedTodo = data.data.message
    newTodo = [...todos,updatedTodo]
    setTodos(newTodo);
    console.log(newTodo);
    setTodoText("");
  }
  
  async function handleCheckedTodo(index) {
    const newTodos = [...todos];
    newTodos[index].checked = !newTodos[index].checked;
    setTodos(newTodos);

    await axios.put(
      "http://localhost:3000/tasks/update",
      {
        newTodo: newTodos[index],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentails.email}:${credentails.password}`,
        },
      }
    );
  }
  
  async function handleDeleteTodo(index) {
    const newTodos = [...todos]; // Create a copy of the todos array

    console.log(index);
    await axios.delete("http://localhost:3000/tasks/deleteTodo", {
      data: { newTodo : newTodos[index] }
    });
    setRefresh((prev) => !prev);
  }


  useEffect(
    ()=>{
      getTodos()
    },[refresh]
  )



  return (
    <div className="todo-container">
    <form>
      <input
        className="todo-input"
        value={todoText}
        type="text"
        placeholder="Enter Todo Text here"
        onChange={(e) => {
          setTodoText(e.target.value);
        }}
      />
      <button type="submit" onClick={handleSubmit} className="add-button">
        Add
      </button>
    </form>
    {todos.map((item, index) => {
      return (
        <div key={index} className="todo-item">
          <input
            onChange={() => {
              handleCheckedTodo(index);
            }}
            type="checkbox"
            name="checked"
            checked={item.checked ? item.checked : false}
            className="checkbox"
          />
          <label htmlFor="chechbox" className={item.checked ? 'todo-label checked' : 'todo-label'}>
            <h3>{item.title}</h3>
          </label>
          <button
            onClick={() => {
              handleDeleteTodo(index);
            }}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      );
    })}
  </div>
  );
};

export default Todos;
