import type { AppDispatch } from "./app"
import type { extraArgument } from "../../../store/store"
import type { RootState } from "./root-state.type"

type AsyncThunkConfig = {
  state: RootState,
  dispatch: AppDispatch,
  extra: typeof extraArgument
}

export { type AsyncThunkConfig };