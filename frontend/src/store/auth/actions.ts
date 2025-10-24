import { createAsyncThunk } from "@reduxjs/toolkit";

import { name } from "./slice";
import { type AsyncThunkConfig } from "../../common/common";
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

export { register };
