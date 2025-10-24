using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoList.Core.Entities.Dtos;
using TodoList.Core.Entities.Models;
using TodoList.Core.Service.Contracts;

namespace TodoList.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController(ITodoListService todoService) : ProtectedController
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
            => Ok(await todoService.GetTodosAsync(UserId));

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(long id)
        {
            var todoItem = await todoService.GetTodoByIdAsync(id, UserId);

            if (todoItem == null)
            {
                return Forbid();
            }

            return Ok(todoItem);
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<TodoItemDto>> PatchTodoItem(long id, TodoItemUpdateDto request)
        {
            var todoItem = await todoService.UpdateTodoAsync(id, request, UserId);

            if (todoItem == null)
            {
                return Forbid();
            }

            return Ok(todoItem);
        }

        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> PostTodoItem(TodoItemCreateDto request)
        {
            var todoItem = await todoService.CreateTodoAsync(request, UserId);

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var deleted = await todoService.DeleteTodoAsync(id, UserId);

            if (!deleted)
            {
                return Forbid();
            }

            return NoContent();
        }
    }
}
