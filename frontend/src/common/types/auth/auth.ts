type UserDto = {
  id: string;
  username: string;
};

type RegisterUserDto = {
  username: string;
  password: string;
};

type RegisterUserResponse = UserDto;

export { type UserDto, type RegisterUserDto, type RegisterUserResponse };
