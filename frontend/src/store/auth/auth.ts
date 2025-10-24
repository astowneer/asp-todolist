import { register, login } from "./actions";
import { actions, reducer } from "./slice";

const allActions = {
  ...actions,
  register,
  login,
};

export { allActions as actions, reducer };
