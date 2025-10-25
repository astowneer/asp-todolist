import { type TodoItemCreateDto } from "@/common/common";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { createTodoItem } from "@/store/todo-list/actions";
import z from "zod";

const todoItemSchema = z.object({
  name: z.string().min(5, "Name should be at least 3 characters"),
  description: z.string(),
  isCompleted: z.boolean(),
});

export function CreateForm() {
  const form = useForm<TodoItemCreateDto>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { name: "", description: "", isCompleted: false },
  });

  const dispatch = useAppDispatch();
  const { handleSubmit, reset } = form;

  const onSubmit = async (data: TodoItemCreateDto) => {
    await dispatch(createTodoItem({ ...data, isCompleted: false }));
    reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-amber-300 hover:bg-amber-400 text-black"
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
