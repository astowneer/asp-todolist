import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import {
  type AsyncThunkConfig,
  type LoginUserDto,
  type LoginUserResponseDto,
} from "../../common/common";
import {
  type RegisterUserDto,
  type RegisterUserResponse,
} from "../../common/common";

const register = createAsyncThunk<
  RegisterUserResponse,
  RegisterUserDto,
  AsyncThunkConfig
>(`${name}/register`, async (payload, { extra }) => {
  const { usersService } = extra;

  const result = usersService.register(payload);

  return result;
});

const login = createAsyncThunk<
  LoginUserResponseDto,
  LoginUserDto,
  AsyncThunkConfig
>(`${name}/login`, async (payload, { extra }) => {
  const { usersService } = extra;

  const result = usersService.login(payload);

  return result;
});

export { register, login };
