import { type TodoItemDto } from "@/common/common";
import { Button } from "../ui/button";

type Properties = {
  todoItem: TodoItemDto;
  handleCompled: (id: number) => void;
  handleDelete: (id: number) => void;
};

export function TaskCard({
  todoItem,
  handleCompled,
  handleDelete,
}: Properties) {
  return (
    <div key={todoItem.id} className="border p-2 mb-2">
      <label
        htmlFor={`todo-${todoItem.id}`}
        className="flex items-center gap-2"
      >
        <input
          type="checkbox"
          id={`todo-${todoItem.id}`}
          checked={todoItem.isCompleted}
          onChange={() => handleCompled(todoItem.id)}
          className="accent-amber-500"
        />
        <div>
          <div className="font-bold">{todoItem.name}</div>
          <div className="font-semibold">{todoItem.description}</div>
        </div>
      </label>
      <Button
        className="mt-2 bg-red-500 hover:bg-red-600"
        onClick={() => handleDelete(todoItem.id)}
      >
        Delete
      </Button>
    </div>
  );
}
