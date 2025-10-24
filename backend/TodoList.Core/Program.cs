using Microsoft.EntityFrameworkCore;
using TodoList.Core.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<UserDbContext>(opt =>
    opt.UseInMemoryDatabase("UserDb"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
   {
       options.DocumentPath = "/openapi/v1.json";
   });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
