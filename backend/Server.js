const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routesToDo = require("./routes/ToDoRoutes");
const routesUser = require("./routes/userRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb://localhost:27017/todo')
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api", routesToDo);
app.use("/api/user", routesUser);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));
