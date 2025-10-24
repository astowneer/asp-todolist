import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { users as usersService } from "../services/services";

export const extraArgument = {
  usersService,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } }),
});

export { store };
