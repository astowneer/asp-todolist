using Microsoft.EntityFrameworkCore;

namespace TodoList.Core.Entities.Models;

public class TodoDbContext(DbContextOptions<TodoDbContext> options) : DbContext(options)
{
  public DbSet<TodoItem> TodoItems { get; set; } = null!;
}

