import { createTodoItem, deleteTodoItem, loadTodoList } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadTodoList,
  createTodoItem,
  deleteTodoItem,
};

export { allActions as actions, reducer };
