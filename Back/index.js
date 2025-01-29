import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDb } from "./connection/db.js";
import { todoRouter } from "./routes/todoRoutes.js"


const app = express();
const port = process.env.PORT

// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors({ origin: "https://todolist-fullstack-1-i2zm.onrender.com" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectToDb()

app.use("/api/todos", todoRouter)

app.listen(port, () => {
  console.log("Server started at Port" + port);
})
