using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TodoList.Core.Controllers;

[Authorize]
public class ProtectedController : ControllerBase
{
  protected int UserId
  {
    get
    {
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if (!int.TryParse(userIdClaim, out var id))
      {
        throw new UnauthorizedAccessException("User ID not found in token");
      }

      return id;
    }
  }
}
