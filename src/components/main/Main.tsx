import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useTodoContext from "../../contexts/TodoContext";
import { ITodo } from "../../types/todoTypes";
import Item from "../ui/item/Item";

const Main = () => {
  const { pathname: location } = useLocation();
  const { todos } = useTodoContext();
  const [renderizedTodo, setRenderizedTodo] = useState<ITodo[]>([]);

  useEffect(() => {
    const filteredTodos = todos.filter((todo) => {
      if (location === "/active") return !todo.isDone;
      if (location === "/completed") return todo.isDone;
      return true;
    });
    setRenderizedTodo(filteredTodos);
  }, [location, todos]);

  return (
    <main className="relative border border-gray-200">
      {renderizedTodo.length > 0 && (
        <div className="absolute top-[-57px] left-0 w-[45px] h-[55px]">
          <button
            className={"w-full h-full flex justify-center items-center"}
            name="toggle all"
          >
            <ChevronDown size={28} />
          </button>
        </div>
      )}
      <ul className="flex flex-col-reverse">
        {renderizedTodo.length > 0 &&
          renderizedTodo.map((todo) => <Item key={todo.id} todo={todo} />)}
      </ul>
    </main>
  );
};

export default Main;
