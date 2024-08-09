import TodoCard from "./TodoCard";

export default function TodoList() {
  return (
    <>
      <div className="shadow-lg rounded-lg flex flex-col min-h-screen justify-center items-center">
        <h2 className="my-8 font-bold text-teal-800 text-4xl"> TODO LIST </h2>
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </>
  );
}
