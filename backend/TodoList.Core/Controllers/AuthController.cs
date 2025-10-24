using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoList.Core.Data;
using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;

namespace TodoList.Core.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
  private readonly UserDbContext _context;

  public AuthController(UserDbContext context)
  {
    _context = context;
  }
        
  [HttpPost("register")]
  public async Task<ActionResult<User>> RegisterAsync(RegisterUserDto request)
  {
    if (await _context.Users.AnyAsync(u => u.Username == request.Username))
    {
      return BadRequest("User not found");
    }

    var user = new User();

    var hashedPassword = new PasswordHasher<User>().HashPassword(user, request.Password);

    user.Username = request.Username;
    user.PasswordHash = hashedPassword;

    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return Ok(user);
  }
}
