using Microsoft.EntityFrameworkCore;
using TodoList.Core.Entities.Models;

namespace TodoList.Core.Data;

public class UserDbContext(DbContextOptions<UserDbContext> options) : DbContext(options)
{
  public DbSet<User> Users { get; set; }
}
