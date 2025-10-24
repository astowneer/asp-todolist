import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createTodoItem,
  deleteTodoItem,
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
          deleteTodoItem.pending
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
          deleteTodoItem.fulfilled
        ),
        (state: State, action) => {
          if (loadTodoList.fulfilled.match(action)) {
            state.todoList = action.payload;
          } else if (createTodoItem.fulfilled.match(action)) {
            state.todoItem = action.payload;
          }
          state.status = DataStatus.FULFILLED;
        }
      )
      .addMatcher(
        isAnyOf(
          loadTodoList.rejected,
          createTodoItem.rejected,
          updateTodoItem.rejected,
          deleteTodoItem.fulfilled
        ),
        (state: State) => {
          state.status = DataStatus.REJECTED;
        }
      ),
});

export { reducer, actions, name };
