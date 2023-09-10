import express from "express";
import { config } from "dotenv";
import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "blog",
  })
  .then(() => console.log("Database2 Connected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  checked: {
    type: Boolean,
    default: false,
  },
  email : String,
  userid: mongoose.Schema.ObjectId,
});

const user = mongoose.model("User", userSchema);
const Todos = mongoose.model("Todos", todoSchema);

let app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("/users/login", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
config({
  path: "./Database/config.env",
});

app.get("/", (req, res) => {
  res.send("Started");
});

app.post("/users/login", async (req, res) => {
  let { email, password } = req.body;

  let findedUser = await user.findOne({ email });

  if (!findedUser) {
    return res.json({
      success: false,
      message: "OOPS! User doesn't exist",
    });
  }

  let checkPassword = await bcrypt.compare(password, findedUser.password);

  if (!checkPassword) {
    return res.json({
      success: false,
      message: "Incorrect Password",
    });
  }
  res.json({
    success: true,
    message: "Logged in ",
    info: {
      email,
      password,
    },
  });
});

app.post("/users/register", async (req, res) => {
  let { name, email, password } = req.body;

  let findedUser = await user.findOne({ email });

  if (findedUser) {
    return res.json({
      success: false,
      message: "User already exist with this email",
    });
  }

  let hashPassword = await bcrypt.hash(password, 10);
  await user.create({
    name,
    email,
    password: hashPassword,
  });
  res.json({
    success: true,
    message: "Registered Succesfully",
    info: {
      name,
      password,
    },
  });
});

app.get("/users/logout", (req, res) => {
  res.json({
    success: true,
    message: "Logged Out",
  });
});

app.get("/tasks/getTasks", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [email, password] = token.split(":");
  let findedUser = await user.findOne({ email });
  if (!findedUser) {
    return res.json({
      success: false,
      message: "Invalid Login",
    });
  }
  let userid = findedUser._id;

  // let userTodo = todos.findOne({email})
  let userTodoArray = await Todos.find({ userid });

  res.json({
    success: true,
    message: userTodoArray,
  });
});

app.post("/tasks/add", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [email, password] = token.split(":");
  const todoItems = req.body;

  const lengthOfTodo = todoItems.newTodo.length;
  let element = todoItems.newTodo[lengthOfTodo - 1];

  let { checked, title } = element;

  let findedUser = await user.findOne({ email });

  if (!findedUser) {
    return res.json({
      success: false,
      message: "Invalid Login",
    });
  }

  let createdTodo = await Todos.create({
    title,
    checked,
    userid: findedUser._id,
    email
  });

  res.json({
    success: true,
    message: createdTodo,
  });
});

app.put("/tasks/update", async (req, res) => {
  try {
    const { authorization } = req.headers;
    const [, token] = authorization.split(" ");
    const [email, password] = token.split(":");

    let findedUser = await user.findOne({ email });

    if (!findedUser) {
      return res.json({
        success: false,
        message: "Invalid Login",
      });
    }

    let updateTodo = req.body.newTodo;

    let todoId = updateTodo._id;
    const task = await Todos.findById(todoId);
    task.checked = !task.checked;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    console.log(error);
  }
});


app.delete("/tasks/deleteTodo", async (req, res) => {
  try {
    let deleteTodo = req.body.newTodo
    let todoId = deleteTodo._id

    let task = await Todos.findById(todoId)
    task.deleteOne()
    
    res.json({
      success: true,
      message : "Deleted"
    });

  } catch (error) {

  }
});


app.delete("/tasks/deleteAll", async (req, res) => {
  try {
    let deleteTodo = req.body.newTodos
    let userId = deleteTodo[0].userid

     await Todos.deleteMany({ userid: userId})

    res.json({
      success: true,
      message : "Deleted"
    });

  } catch (error) {

  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
