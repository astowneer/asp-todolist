using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;

namespace TodoList.Core.Service.Contracts;

public interface IAuthService
{
  Task<TokenResponseDto?> LoginAsync(LoginUserDto request);
  Task<User?> RegisterAsync(RegisterUserDto request);
}
