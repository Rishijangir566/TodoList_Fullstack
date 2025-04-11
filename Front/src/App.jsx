import bgImg from "./assets/new.jpg";
import TodoList from "./TodoList";
function App() {
  return (
    <>
      <div
        className="min-h-screen w-full bg-no-repeat bg-cover bg-center py-8 px-4 sm:px-8"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <TodoList />
      </div>
    </>
  );
}

export default App;
