import { type TypedUseSelectorHook, useSelector } from "react-redux";

import { type RootState } from "../common/common";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
