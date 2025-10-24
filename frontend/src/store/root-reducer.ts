import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export { rootReducer };
