import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createTodoItem,
  deleteTodoItem,
  filterTodoList,
  loadTodoList,
  updateTodoItem,
} from "./actions";
import { DataStatus, type TodoItemDto, type ValueOf } from "@/common/common";

type State = {
  todoList: TodoItemDto[] | null;
  todoItem: TodoItemDto | null;
  status: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  todoList: null,
  todoItem: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: "todo-list",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addMatcher(
        isAnyOf(
          loadTodoList.pending,
          createTodoItem.pending,
          updateTodoItem.pending,
          deleteTodoItem.pending,
          filterTodoList.pending
        ),
        (state: State) => {
          state.status = DataStatus.PENDING;
        }
      )
      .addMatcher(
        isAnyOf(
          loadTodoList.fulfilled,
          createTodoItem.fulfilled,
          updateTodoItem.fulfilled,
          deleteTodoItem.fulfilled,
          filterTodoList.fulfilled
        ),
        (state: State, action) => {
          console.log("ACTION TYPE:", action.type, action.payload);
          if (
            loadTodoList.fulfilled.match(action) ||
            filterTodoList.fulfilled.match(action)
          ) {
            state.todoList = action.payload;
          } else if (createTodoItem.fulfilled.match(action)) {
            state.todoList = [...(state.todoList ?? []), action.payload];
          } else if (updateTodoItem.fulfilled.match(action)) {
            state.todoList =
              state.todoList?.map((todoItem) =>
                todoItem.id === action.payload.id ? action.payload : todoItem
              ) ?? null;
          } else if (deleteTodoItem.fulfilled.match(action)) {
            state.todoList =
              state.todoList?.filter(
                (todoItem) => todoItem.id !== action.payload
              ) ?? null;
          }
          state.status = DataStatus.FULFILLED;
        }
      )
      .addMatcher(
        isAnyOf(
          loadTodoList.rejected,
          createTodoItem.rejected,
          updateTodoItem.rejected,
          deleteTodoItem.rejected,
          filterTodoList.rejected
        ),
        (state: State) => {
          state.status = DataStatus.REJECTED;
        }
      ),
});

export { reducer, actions, name };
