import type { ValueOf } from "../../common/utils/value-of";
import { createSlice } from "@reduxjs/toolkit";
import { register } from "./actions";
import { DataStatus, type UserDto } from "../../common/common";

type State = {
  userInfo: UserDto | null;
  status: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  userInfo: null,
  status: DataStatus.IDLE,
};

const { reducer, actions, name } = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.status = DataStatus.PENDING;
    }),
    builder.addCase(register.fulfilled, (state, action) => {
      state.userInfo = action.payload;
      state.status = DataStatus.FULFILLED;
    }),
    builder.addCase(register.rejected, (state) => {
      state.status = DataStatus.REJECTED;
    });
  },
});

export { reducer, actions, name };
