import { type TodoItemDto } from "@/common/common";

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
        />
        <div>
          <div className="font-bold">{todoItem.name}</div>
          <div>{todoItem.description}</div>
        </div>
      </label>
      <button
        className="mt-2 text-red-600"
        onClick={() => handleDelete(todoItem.id)}
      >
        Delete
      </button>
    </div>
  );
}
