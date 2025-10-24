type UserDto = {
  id: string;
  username: string;
};

type RegisterUserDto = {
  username: string;
  password: string;
};

type RegisterUserResponse = UserDto;

type LoginUserDto = {
  username: string;
  password: string;
};

type LoginUserResponseDto = {
  accessToken: string;
  refreshToken: string;
};

export {
  type UserDto,
  type RegisterUserDto,
  type RegisterUserResponse,
  type LoginUserDto,
  type LoginUserResponseDto,
};
