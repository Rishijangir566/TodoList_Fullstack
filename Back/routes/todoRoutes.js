import express from "express";
import { addTodo, deleteTodo, editTodo, fetchTodo } from "../controllers/todocontrol.js";

export const todoRouter = express.Router()


todoRouter.get("/get", addTodo)

todoRouter.post("/add", fetchTodo)

todoRouter.put("/edit/:id", editTodo)

todoRouter.delete("/delete/:id", deleteTodo)