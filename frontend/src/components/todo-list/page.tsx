import {
  DataStatus,
  type TodoItemCreateDto,
  type TodoItemDto,
} from "@/common/common";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import {
  createTodoItem,
  deleteTodoItem,
  loadTodoList,
  updateTodoItem,
} from "@/store/todo-list/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(todoItemSchema) });

  const onSubmit = async (data: TodoItemCreateDto) => {
    await dispatch(createTodoItem(data));
    await dispatch(loadTodoList());
    reset();
  };

  const handleDelete = async (id: number) => {
    const todo = todoList?.find((todoItem) => todoItem.id === id);

    if (!todo) return;

    await dispatch(deleteTodoItem(id));
    await dispatch(loadTodoList());
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
    await dispatch(loadTodoList());
  };

  const todoList = useAppSelector((state) => state.todoList.todoList);
  const status = useAppSelector((state) => state.todoList.status);
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
