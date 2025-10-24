import { useDispatch } from "react-redux";

import { type AppDispatch } from "../common/common";

const useAppDispatch: () => AppDispatch = () => useDispatch<AppDispatch>();

export { useAppDispatch };
