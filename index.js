// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// import tasksRoutes from "./routes/tasks-routes.js";
// import usersRoutes from "./routes/users-routes.js";
// import taskListRoutes from "./routes/task_lists-routes.js"

// const app = express();

// //set port
// const PORT = process.env.PORT || 8080;

// //Middleware
// app.use(cors());
// app.use(express.static("public"));
// app.use(express.json());

// app.use("/api/tasks", tasksRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/lists", taskListRoutes);


// app.listen(PORT, () => {
// console.log(`running at http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import "dotenv/config";

import tasksRoutes from "./routes/tasks-routes.js";
import usersRoutes from "./routes/users-routes.js";
import taskListRoutes from "./routes/task_lists-routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Route handling
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/lists", taskListRoutes);

// Export the Express app as a serverless function
export default (req, res) => {
  app(req, res); // Handing requests in serverless context
};
