namespace TodoList.Core.Entities.Dtos;

public class TodoItemUpdateDto
{
  public long Id { get; set; }
  public string? Name { get; set; }
  public string? Description { get; set; }
  public bool? IsCompleted { get; set; }
}
