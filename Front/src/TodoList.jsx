import { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
  const [input, setInput] = useState("");
  const [task, setTask] = useState([]);
  const [editingId, setEditingId] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, [task]);

  async function fetchData() {
    //   const result =await axios.get("http://localhost:3000/api/todos/get")
    const result = await axios.get(
      "https://todolist-fullstack-dten.onrender.com/api/todos/get"
    );
    setTask(result.data);
  }

  async function addTask() {
    if (editingId) {
      const obj = {
        id: idToEdit,
        title: input,
      };

      // const response = await axios.put(`http://localhost:3000/api/todos/edit/${idToEdit}`,obj)
      const response = await axios.put(
        `https://todolist-fullstack-dten.onrender.com/api/todos/edit/${idToEdit}`,
        obj
      );
      if (response.data.messege === "Todo Updated") {
        fetchData();
        setIdToEdit(null);
        setEditingId(false);
      }
      setEditingId(false);
    } else {
      const obj = {
        id: Date.now(),
        title: input,
        completed: false,
      };
      // const response = await axios.post(`http://localhost:3000/api/todos/add`,obj)
      const response = await axios.post(
        `https://todolist-fullstack-dten.onrender.com/api/todos/add`,
        obj
      );
      if (response.status === 201 && response.data.messege === "Todo Saved") {
        fetchData();
      }
    }
    setInput("");
  }

  async function Edit(id) {
    const taskToEdit = task.find((obj) => obj.id === id);
    setInput(taskToEdit.title);
    setEditingId(true);
    setIdToEdit(taskToEdit.id);
  }

  async function Delete(id) {
    //   const response =await axios.delete(`http://localhost:3000/api/todos/delete/${id}`)
    const response = await axios.delete(
      `https://todolist-fullstack-dten.onrender.com/api/todos/delete/${id}`
    );
    if (response.data.messege === "Todo Deleted") fetchData();
  }

  async function toggleComplete(id) {
    const tasks = task.find((item) => item.id === id);
    const updateTask = {
      ...tasks,
      completed: !tasks.completed,
    };

    // const response = await axios.put(`http://localhost:3000/api/todos/edit/${id}`,updateTask)
    const response = await axios.put(
      `https://todolist-fullstack-dten.onrender.com/api/todos/edit/${id}`,
      updateTask
    );
    if (response.data.message === "Todo Updated") {
      fetchData();
    }
  }

  return (
    <>
      <h2 className="text-4xl md:text-5xl font-bold text-purple-950 my-8 text-center">
        To-Do List
      </h2>

      <div className="text-center mx-auto h-auto bg-gray-500 py-4 px-4 rounded-md w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter Your Task"
          className="pl-2 w-full sm:w-72 bg-white rounded-md py-1 mb-4 sm:mb-0"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="block sm:inline ml-0 sm:ml-4 mt-2 sm:mt-0 font-bold text-lg sm:text-xl bg-red-600 text-white rounded px-4 py-1"
          onClick={addTask}
        >
          {editingId ? "Edit Task" : "Add Task"}
        </button>
      </div>

      <ul className="mt-8 px-4 space-y-4 max-w-2xl mx-auto">
        {task.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 px-4 sm:px-8 text-lg sm:text-2xl bg-gray-600 text-white py-3 rounded-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />
              <span
                className="break-words"
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </span>
            </div>

            <div className="flex gap-2 sm:gap-4 flex-wrap">
              <button
                className="font-medium text-sm sm:text-lg bg-green-500 rounded px-3 py-1 text-white disabled:opacity-45"
                disabled={item.completed}
                onClick={() => Edit(item.id)}
              >
                Edit
              </button>
              <button
                className="font-medium text-sm sm:text-lg bg-red-600 rounded px-3 py-1 text-white disabled:opacity-45"
                disabled={item.completed}
                onClick={() => Delete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default TodoList;
