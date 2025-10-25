import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import {
  users as usersService,
  todoList as todoListService,
} from "@/services/services";

export const extraArgument = {
  usersService,
  todoListService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export { store };
