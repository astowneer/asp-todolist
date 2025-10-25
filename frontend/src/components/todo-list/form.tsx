import { type TodoItemCreateDto } from "@/common/common";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type Properties = {
  form: UseFormReturn<TodoItemCreateDto>;
  onSubmit: (data: TodoItemCreateDto) => void;
};

export function CreateForm({ form, onSubmit }: Properties) {
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" className="bg-amber-300 hover:bg-amber-400 text-black">Add</Button>
      </form>
    </FormProvider>
  );
}
