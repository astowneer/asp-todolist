using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;
using TodoList.Core.Service.Contracts;

namespace TodoList.Core.Services;

public class TodoListService(TodoDbContext context) : ITodoListService
{
  public async Task<IEnumerable<TodoItemDto>> GetTodosAsync(int userId)
  {
    return await context.TodoItems
        .Where(t => t.UserId == userId)
        .Select(t => ToDto(t))
        .ToListAsync();
  }

  public async Task<TodoItemDto?> GetTodoByIdAsync(long id, int userId)
  {
    var todoItem = await context.TodoItems.FindAsync(id);

    if (todoItem == null || todoItem.UserId != userId)
    {
      return null;
    }

    return ToDto(todoItem);
  }

  public async Task<TodoItemDto> CreateTodoAsync(TodoItemCreateDto request, int userId)
  {
    var todoItem = new TodoItem
    {
      Name = request.Name,
      Description = request.Description,
      IsCompleted = request.IsCompleted,
      UserId = userId
    };

    context.TodoItems.Add(todoItem);
    await context.SaveChangesAsync();

    return ToDto(todoItem);
  }

  public async Task<TodoItemDto?> UpdateTodoAsync(long id, TodoItemUpdateDto request, int userId)
  {
    var todoItem = await context.TodoItems.FindAsync(id);
    if (todoItem == null || todoItem.UserId != userId)
    {
      return null;
    }

    if (request.Name != null) todoItem.Name = request.Name;
    if (request.Description != null) todoItem.Description = request.Description;
    if (request.IsCompleted.HasValue) todoItem.IsCompleted = request.IsCompleted.Value;

    await context.SaveChangesAsync();
    return ToDto(todoItem);
  }

  public async Task<bool> DeleteTodoAsync(long id, int userId)
  {
    var todoItem = await context.TodoItems.FindAsync(id);
    if (todoItem == null || todoItem.UserId != userId)
    {
      return false;
    }

    context.TodoItems.Remove(todoItem);
    await context.SaveChangesAsync();

    return true;
  }

  public async Task<IEnumerable<TodoItemDto>> GetTodoItemsByStatusAsync(bool? isCompleted, int userId)
  {
    var query = context.TodoItems.Where(t => t.UserId == userId);

    if (isCompleted.HasValue)
    {
      query = query.Where(t => t.IsCompleted == isCompleted.Value);
    }

    var filteredTodos = await query
        .Select(x => ToDto(x))
        .ToListAsync();

    return filteredTodos;
  }

  private static TodoItemDto ToDto(TodoItem todo) =>
      new TodoItemDto
      {
        Id = todo.Id,
        Name = todo.Name,
        Description = todo.Description,
        IsCompleted = todo.IsCompleted,
        UserId = todo.UserId
      };
}
