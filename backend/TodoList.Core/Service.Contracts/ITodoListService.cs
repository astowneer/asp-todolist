using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;

namespace TodoList.Core.Service.Contracts;

public interface ITodoListService
{
  Task<IEnumerable<TodoItemDto>> GetTodosAsync(int userId);
  Task<TodoItemDto?> GetTodoByIdAsync(long id, int userId);
  Task<TodoItemDto> CreateTodoAsync(TodoItemCreateDto dto, int userId);
  Task<TodoItemDto?> UpdateTodoAsync(long id, TodoItemUpdateDto dto, int userId);
  Task<bool> DeleteTodoAsync(long id, int userId); 
}
