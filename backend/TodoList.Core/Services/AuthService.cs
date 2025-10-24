using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoList.Core.Data;
using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;
using TodoList.Core.Service.Contracts;

namespace TodoList.Core.Services;

public class AuthService(UserDbContext context) : IAuthService
{
  public async Task<User?> LoginAsync(LoginUserDto request)
  {
    var user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);

    if (user is null)
    {
      return null;
    }

    if (new PasswordHasher<User>().VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed)
    {
      return null;
    }

    return user;
  }

  public async Task<User?> RegisterAsync(RegisterUserDto request)
  {
    if (await context.Users.AnyAsync(u => u.Username == request.Username))
    {
      return null;
    }

    var user = new User();

    var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);

    user.Username = request.Username;
    user.PasswordHash = hashedPassword;

    context.Users.Add(user);
    await context.SaveChangesAsync();

    return user;
  }
}
