import { Todo } from "../models/todoModel.js"
import mongoose from "mongoose";

export async function addTodo(req, res) {
    const todos = await Todo.find();
    res.send(todos)
}

export async function fetchTodo(req, res) {
    const { id, title, completed } = req.body;
    const newTodo = new Todo({
        id,
        title,
        completed
    })
    await newTodo.save();
    res.status(201).send({ messege: "Todo Saved" });

}

export async function editTodo(req, res) {
    const id = req.params.id
    const { title, completed } = req.body;
    await Todo.findOneAndUpdate({ id }, { title, completed });
    res.send({ messege: "Todo Updated" });
}

export async function deleteTodo(req, res) {
    const id = req.params.id;
    await Todo.findOneAndDelete({ id });
    res.send({ messege: "Todo Deleted" });
}