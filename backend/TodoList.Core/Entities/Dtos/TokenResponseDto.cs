using TodoList.Core.Entities.Models;

namespace TodoList.Core.Entities.Dtos;

public class TokenResponseDto
{
  public User User { get; set; }
  public string AccessToken { get; set; }
}
