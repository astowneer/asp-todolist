import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth/auth";
import { reducer as todoListReducer } from "./todo-list/todo-list";

const rootReducer = combineReducers({
  auth: authReducer,
  todoList: todoListReducer,
});

export { rootReducer };
