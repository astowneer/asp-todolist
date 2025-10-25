import { type TodoItemCreateDto } from "@/common/common";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import {
  createTodoItem,
  deleteTodoItem,
  filterTodoList,
  loadTodoList,
  updateTodoItem,
} from "@/store/todo-list/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const todoItemSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .min(5, "Username should be at least 5 characters"),
  description: z.string(),
  isCompleted: z.boolean().default(false),
});

export function TodoList() {
  const { reset, register, handleSubmit } = useForm({
    resolver: zodResolver(todoItemSchema),
  });

  const onSubmit = async (data: TodoItemCreateDto) => {
    await dispatch(createTodoItem(data));
    reset();
  };

  const handleDelete = async (id: number) => {
    const todo = todoList?.find((todoItem) => todoItem.id === id);

    if (!todo) return;

    await dispatch(deleteTodoItem(id));
  };

  const handleCompled = async (id: number) => {
    const todo = todoList?.find((todoItem) => todoItem.id === id);

    if (!todo) return;

    await dispatch(
      updateTodoItem({
        id,
        isCompleted: !todo.isCompleted,
      })
    );
  };

  const handleFilter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "all") {
      await dispatch(loadTodoList());
    } else {
      await dispatch(filterTodoList(value === "true"));
    }
  };

  const todoList = useAppSelector((state) => state.todoList.todoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTodoList());
  }, [dispatch]);

  return (
    <main className="bg-yellow-500">
      <h1>Todos</h1>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("name")}
            className="border-2 border-black"
          />
          <input
            type="text"
            {...register("description")}
            className="border-2 border-black"
          />
          <button type="submit">add</button>
        </form>
      </section>
      <select name="filter" id="filter" onChange={handleFilter}>
        <option value="all">All</option>
        <option value="true">Completed</option>
        <option value="false">Not Completed</option>
      </select>
      <section>
        {todoList?.map((todoItem) => (
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
