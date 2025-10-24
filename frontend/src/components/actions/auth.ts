const baseUrl = "https://localhost:7152";

type RegisterUserDto = {
  username: string;
  password: string;
};

export const register = (user: RegisterUserDto) =>
  fetch(`${baseUrl}/api/auth/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(user)
  });
