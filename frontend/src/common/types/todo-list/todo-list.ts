type TodoItemDto = {
  id: number;
  name: string;
  description: string;
  isCompleted: boolean;
};

type TodoItemCreateDto = {
  name: string;
  description: string;
  isCompleted: boolean;
};

type TodoItemUpdateDto = { id: number } & Partial<TodoItemCreateDto>;

export { type TodoItemDto, type TodoItemCreateDto, type TodoItemUpdateDto };
