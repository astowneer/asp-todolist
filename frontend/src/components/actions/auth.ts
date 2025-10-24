import { users } from "../../services/services";

type RegisterUserDto = {
  username: string;
  password: string;
};

export const registerAction = (user: RegisterUserDto) => users.register(user);
