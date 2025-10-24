import { useState } from "react";

type TodoItem = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
};

export function TodoList() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTodoList([
      ...todoList,
      { id: Date.now().toString(), name, isCompleted: false, description },
    ]);

    setName("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    setTodoList((prev) => prev.filter((todoItem) => todoItem.id !== id));
  };

  const handleCompled = (id: string) => {
    setTodoList((prev) =>
      prev.map((todoItem) =>
        todoItem.id === id
          ? { ...todoItem, isCompleted: !todoItem.isCompleted }
          : todoItem
      )
    );
  };

  return (
    <main className="bg-yellow-500">
      <h1>Todos</h1>
      <section>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border-2 border-black"
          />
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="border-2 border-black"
          />
          <button type="submit">add</button>
        </form>
      </section>
      <section>
        {todoList.map((todoItem) => (
          <div key={todoItem.id}>
            <label htmlFor={`todo-${todoItem.id}`}>
              <input
                type="checkbox"
                id={`todo-${todoItem.id}`}
                checked={todoItem.isCompleted}
                onChange={() => handleCompled(todoItem.id)}
              />
              <div>{todoItem.name}</div>
              <div>{todoItem.description}</div>
            </label>
            <form action="">
              <input type="hidden" name="id" value={todoItem.id} />
              <button onClick={() => handleDelete(todoItem.id)}>Deletee</button>
            </form>
          </div>
        ))}
      </section>
    </main>
  );
}
