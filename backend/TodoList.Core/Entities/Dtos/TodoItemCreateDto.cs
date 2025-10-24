namespace TodoList.Core.Entities.Dtos;

public class TodoItemCreateDto
{
  public string Name { get; set; } = String.Empty;
  public string? Description { get; set; } = String.Empty;
  public bool IsCompleted { get; set; }
}
