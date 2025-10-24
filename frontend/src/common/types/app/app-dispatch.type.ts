import type { ThunkDispatch } from "redux-thunk";
import type { RootState } from "./app";
import { extraArgument } from "../../../store/store";

type AppDispatch = ThunkDispatch<RootState, typeof extraArgument, any>;

export { type AppDispatch };
