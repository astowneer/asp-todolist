import { register } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  register,
};

export { allActions as actions, reducer };
