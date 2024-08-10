import AddModal from "./AddModal";
import TodoCard from "./TodoCard";
import Filter from "./Filter";
export default function TodoList() {
  return (
    <>
      <div className="parent-div shadow-lg rounded-lg flex flex-col min-h-screen justify-center items-center">
        <h2 className="my-8 font-bold text-teal-800 text-4xl"> TODO LIST </h2>
        <div className="flex w-2/6 justify-between">
          <AddModal />
          <Filter />
        </div>

        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
        <TodoCard />
      </div>
    </>
  );
}
