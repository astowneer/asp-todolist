namespace TodoList.Core.Entities.Dtos;

public class TokenRefreshDto
{
  public int UserId { get; set; }
  public required string RefreshToken { get; set; }
}
