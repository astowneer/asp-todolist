using TodoList.Core.Entities.Models;

namespace TodoList.Core.Entities.Dtos;

public class TokenResponseDto
{
  public string AccessToken { get; set; }
  public string RefreshToken { get; set; }
}
