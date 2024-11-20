import express from "express";
import cors from "cors";
import "dotenv/config";

import tasksRoutes from "./routes/tasks-routes.js";
import usersRoutes from "./routes/users-routes.js";
import taskListRoutes from "./routes/task_lists-routes.js"

const app = express();

//set port
const PORT = process.env.PORT || 8080;

//Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/lists", taskListRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the API. Use endpoints like /api/users");
  });
app.listen(PORT, () => {
console.log(`running at http://localhost:${PORT}`);
});


