type TodoItemDto = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
};

type TodoItemCreateDto = {
  name: string;
  description: string;
  isCompleted: boolean;
};

type TodoItemUpdateDto = Partial<TodoItemCreateDto>;

export { type TodoItemDto, type TodoItemCreateDto, type TodoItemUpdateDto };
