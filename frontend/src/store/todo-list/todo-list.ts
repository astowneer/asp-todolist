import { createTodoItem, loadTodoList } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadTodoList,
  createTodoItem
};

export { allActions as actions, reducer };
