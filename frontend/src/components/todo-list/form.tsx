import { type TodoItemCreateDto } from "@/common/common";
import { type UseFormReturn } from "react-hook-form";

type Properties = {
  form: UseFormReturn<TodoItemCreateDto>;
  onSubmit: (data: TodoItemCreateDto) => void;
};

export function CreateForm({ form, onSubmit }: Properties) {
  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4 flex gap-2">
      <input
        type="text"
        {...register("name")}
        className="border-2 border-black p-1 flex-1"
        placeholder="Task Name"
      />
      <input
        type="text"
        {...register("description")}
        className="border-2 border-black p-1 flex-1"
        placeholder="Description"
      />
      <button type="submit" className="bg-green-500 text-white p-1">
        Add
      </button>
    </form>
  );
}
