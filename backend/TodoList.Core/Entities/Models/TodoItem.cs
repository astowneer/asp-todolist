namespace TodoList.Core.Entities.Models;

public class TodoItem
{
  public long Id { get; set; }
  public string Name { get; set; }
  public string? Description { get; set; }
  public bool IsCompleted { get; set; }
  public int UserId { get; set; }
  public User? User { get; set; }
}
