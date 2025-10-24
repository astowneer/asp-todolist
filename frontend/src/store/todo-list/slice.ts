import { createSlice } from "@reduxjs/toolkit";
import { loadTodoList } from "./actions";
import { DataStatus, type TodoItemDto, type ValueOf } from "@/common/common";

type State = {
  todoList: TodoItemDto[] | null;
  status: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  todoList: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: "todo-list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTodoList.pending, (state) => {
      state.status = DataStatus.PENDING;
    }),
      builder.addCase(loadTodoList.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = DataStatus.FULFILLED;
      }),
      builder.addCase(loadTodoList.rejected, (state) => {
        state.status = DataStatus.REJECTED;
      });
  },
});

export { reducer, actions, name };
