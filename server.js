import express from "express";
import cors from "cors";
import "dotenv/config";
import tasksRoutes from "./routes/tasks-routes.js";
import usersRoutes from "./routes/users-routes.js";

const app = express();

const PORT = process.env.PORT || 8080;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:";

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${BACKEND_URL}${PORT}`);
});
