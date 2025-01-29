
import { useEffect, useState } from 'react'
import axios from "axios"

function TodoList() {
  const [input, setInput] = useState("")
  const [task,setTask] = useState([])
   const [editingId , setEditingId]=useState(false)
  const [idToEdit , setIdToEdit]=useState(null)

   useEffect(()=>{
    fetchData();
   },[task]);

   async function fetchData(){
    //   const result =await axios.get("http://localhost:3000/api/todos/get")
      const result =await axios.get("https://todolist-fullstack-dten.onrender.com/api/todos/get")
      setTask(result.data)
   }

   async function addTask(){
      if(editingId){
         
        const obj={
            id:idToEdit,
            title:input
        }

        // const response = await axios.put(`http://localhost:3000/api/todos/edit/${idToEdit}`,obj)
        const response = await axios.put(`https://todolist-fullstack-dten.onrender.com/api/todos/edit/${idToEdit}`,obj)
        if(response.data.messege==="Todo Updated"){
            fetchData();
            setIdToEdit(null)
            setEditingId(false)
        }
        setEditingId(false)
        
    }
    else{
        const obj={
            id:Date.now(),
            title:input,
            completed:false,
        };
        // const response = await axios.post(`http://localhost:3000/api/todos/add`,obj)
        const response = await axios.post(`https://todolist-fullstack-dten.onrender.com/api/todos/add`,obj)
        if(response.status===201 && response.data.messege==="Todo Saved"){
            fetchData()
        }
    }
    setInput("")
}
    


   async function Edit(id){
       const taskToEdit = task.find((obj)=>obj.id===id)
       setInput(taskToEdit.title)
       setEditingId(true)
       setIdToEdit(taskToEdit.id)
    }

   async function Delete(id){
    //   const response =await axios.delete(`http://localhost:3000/api/todos/delete/${id}`)
      const response =await axios.delete(`https://todolist-fullstack-dten.onrender.com/api/todos/delete/${id}`)
      if(response.data.messege==="Todo Deleted")
        fetchData()
    }

   async function toggleComplete(id){
  const tasks = task.find((item)=>item.id===id)
    const updateTask ={
        ...tasks , completed:!tasks.completed
    }

    // const response = await axios.put(`http://localhost:3000/api/todos/edit/${id}`,updateTask)
    const response = await axios.put(`https://todolist-fullstack-dten.onrender.com/api/todos/edit/${id}`,updateTask)
    if (response.data.message==="Todo Updated"){
        fetchData()
    }
   }
  
      return  (
    <>
    <div className=' text-center mx-auto h-20 bg-blue-900 py-4 text-white rounded-md w-xl'>

      <input type="text" placeholder="Enter Your Task" className='border pl-2 w-72 ' value={input} 
      onChange={(e)=>setInput(e.target.value)} />
      <button className="ml-16 font-bold text-xl bg-red-600 mt-[8px] rounded px-4" onClick={addTask}>{editingId? "Edit Task":"Add Task"} </button>
    </div>

      <ul className='mt-8' >
        {task.map((item)=>{
            return (<li key={item.id} className=' flex justify-between px-12 gap-4  text-2xl mx-auto h-12 bg-gray-600 text-white py-1 mt-4 font-medium rounded-md w-xl'>
            <input type="checkbox" checked={item.completed} onChange={()=>toggleComplete(item.id)} />
            <span style={{textDecoration:item.completed?"line-through":"none"}}>{item.title} </span>
            
            <div className="btns flex gap-4">
           <button className=" font-medium text-xl bg-green-500  rounded px-4 my-1 text-white disabled:opacity-45" disabled={item.completed}  onClick={()=>Edit(item.id)}>Edit</button>
           <button className=" font-medium text-xl bg-red-600 rounded px-4 my-1 text-white  disabled:opacity-45" disabled={item.completed}      onClick={()=>Delete(item.id)}>Delete</button>
            </div>
          </li>)
        }
    )}
       
      </ul>
    </>
  )
}
 export default TodoList