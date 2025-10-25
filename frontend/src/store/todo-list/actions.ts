import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import {
  type AsyncThunkConfig,
  type TodoItemCreateDto,
  type TodoItemDto,
  type TodoItemUpdateDto,
} from "@/common/common";

const loadTodoList = createAsyncThunk<TodoItemDto[], void, AsyncThunkConfig>(
  `${name}/`,
  async (_, { extra, getState }) => {
    const { todoListService } = extra;

    const state = getState();
    const authToken = state.auth.tokens?.accessToken;

    if (!authToken) throw new Error("No token found");

    const result = await todoListService.loadAll(authToken);

    return result;
  }
);

const createTodoItem = createAsyncThunk<
  TodoItemDto,
  TodoItemCreateDto,
  AsyncThunkConfig
>(`${name}/create`, async (payload, { extra, getState }) => {
  const { todoListService } = extra;

  const state = getState();
  const authToken = state.auth.tokens?.accessToken;

  if (!authToken) throw new Error("No token found");

  const result = await todoListService.create({ authToken, payload });

  return result;
});

const updateTodoItem = createAsyncThunk<
  TodoItemDto,
  TodoItemUpdateDto,
  AsyncThunkConfig
>(`${name}/update`, async (payload, { extra, getState }) => {
  const { todoListService } = extra;

  const state = getState();
  const authToken = state.auth.tokens?.accessToken;

  if (!authToken) throw new Error("No token found");

  const result = await todoListService.update({ authToken, payload });

  return result;
});

const deleteTodoItem = createAsyncThunk<number, number, AsyncThunkConfig>(
  `${name}/delete`,
  async (payload, { extra, getState }) => {
    const { todoListService } = extra;

    const state = getState();
    const authToken = state.auth.tokens?.accessToken;

    if (!authToken) throw new Error("No token found");

    await todoListService.delete({ id: payload, authToken });

    return payload;
  }
);

const filterTodoList = createAsyncThunk<
  TodoItemDto[],
  boolean,
  AsyncThunkConfig
>(`${name}/filter`, async (payload, { extra, getState }) => {
  const { todoListService } = extra;

  const state = getState();
  const authToken = state.auth.tokens?.accessToken;

  if (!authToken) throw new Error("No token found");

  const result = await todoListService.filter({
    authToken,
    isCompleted: payload,
  });

  return result;
});

export {
  loadTodoList,
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  filterTodoList,
};
