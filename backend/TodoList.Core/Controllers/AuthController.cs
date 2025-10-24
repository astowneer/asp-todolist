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
using TodoList.Core.Service.Contracts;

namespace TodoList.Core.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IAuthService authService) : ControllerBase
{

  [HttpPost("register")]
  public async Task<ActionResult<User>> RegisterAsync(RegisterUserDto request)
  {
    var user = await authService.RegisterAsync(request);

    if (user is null)
    {
      return BadRequest("User not found");
    }

    return Ok(user);
  }

  [HttpPost("login")]
  public async Task<ActionResult<User>> Login(LoginUserDto request)
  {
    var result = await authService.LoginAsync(request);

    if (result is null)
    {
      return BadRequest("Invalid credentials");
    }

    return Ok(result);
  }
}
