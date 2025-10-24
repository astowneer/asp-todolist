import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import { type AsyncThunkConfig, type TodoItemDto } from "@/common/common";

const loadTodoList = createAsyncThunk<TodoItemDto[], void, AsyncThunkConfig>(
  `${name}/`,
  async (_, { extra, getState }) => {
    const { todoListService } = extra;

    const state = getState();
    const token = state.auth.tokens?.accessToken;

    if (!token) throw new Error("No token found");

    const result = await todoListService.loadAll(token);

    return result;
  }
);

export { loadTodoList };
