import { loadTodoList } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  loadTodoList,
};

export { allActions as actions, reducer };
