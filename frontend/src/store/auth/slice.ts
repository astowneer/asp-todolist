import type { ValueOf } from "../../common/utils/value-of";
import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./actions";
import {
  DataStatus,
  StorageKey,
  type LoginUserResponseDto,
  type UserDto,
} from "../../common/common";

type State = {
  userInfo: UserDto | null;
  tokens: LoginUserResponseDto | null;
  status: ValueOf<typeof DataStatus>;
};

const accessToken = localStorage.getItem(StorageKey.ACCESS_TOKEN);

const initialState: State = {
  userInfo: null,
  tokens: accessToken ? { accessToken, refreshToken: "" } : null,
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
    builder.addCase(login.pending, (state) => {
      state.status = DataStatus.PENDING;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.tokens = action.payload;
        state.status = DataStatus.FULFILLED;
      }),
      builder.addCase(login.rejected, (state) => {
        state.status = DataStatus.REJECTED;
      });
  },
});

export { reducer, actions, name };
