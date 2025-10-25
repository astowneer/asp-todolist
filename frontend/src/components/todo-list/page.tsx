import { type TodoItemCreateDto } from "@/common/common";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
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

import { TaskCard } from "./card";
import { CreateForm } from "./form";
import { FilterSelect } from "./filter";
import { TodoFilter } from "./libs/constants/constants";

const todoItemSchema = z.object({
  name: z.string().min(5, "Name should be at least 3 characters"),
  description: z.string(),
  isCompleted: z.boolean(),
});

export function TodoList() {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList.todoList);

  const form = useForm<TodoItemCreateDto>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { isCompleted: false },
  });

  const onSubmit = async (data: TodoItemCreateDto) => {
    await dispatch(createTodoItem({ ...data, isCompleted: false }));
    form.reset();
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteTodoItem(id));
  };

  const handleCompled = async (id: number) => {
    const todoItem = todoList?.find((todoItem) => todoItem.id === id);
    if (!todoItem) return;
    await dispatch(updateTodoItem({ id, isCompleted: !todoItem.isCompleted }));
  };

  const handleFilter = (value: string) => {
    if (value === TodoFilter.ALL) dispatch(loadTodoList());
    else dispatch(filterTodoList(value === TodoFilter.COMPLETED));
  };

  useEffect(() => {
    dispatch(loadTodoList());
  }, [dispatch]);

  return (
    <main className="p-4 w-full flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-3xl w-full space-y-5">
        <h1 className="text-2xl font-bold mb-4">TodoList</h1>
        <CreateForm form={form} onSubmit={onSubmit} />
        <FilterSelect onChange={handleFilter} />
        <section>
          {todoList?.map((todoItem) => (
            <TaskCard
              key={todoItem.id}
              todoItem={todoItem}
              handleCompled={handleCompled}
              handleDelete={handleDelete}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
