import bgImg from "./assets/new.jpg"
import TodoList from "./TodoList"
function App() {

  return (
    <>
     <div className="h-[100vh] w-[100vw] bg-no-repeat bg-cover bg-center  py-8"
        style={{
          backgroundImage:`url(${bgImg})`
        }}>

     <TodoList/>
     
     </div>
       
    </>
  )
}

export default App
