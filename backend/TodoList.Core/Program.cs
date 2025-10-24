using Microsoft.EntityFrameworkCore;

using TodoList.Core.Data;
using TodoList.Core.Service.Contracts;
using TodoList.Core.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<UserDbContext>(opt =>
    opt.UseInMemoryDatabase("UserDb"));
builder.Services.AddScoped<IAuthService, AuthService>();

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
