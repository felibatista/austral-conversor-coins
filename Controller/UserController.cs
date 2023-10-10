using conversor_coin.Data;
using conversor_coin.Models.Repository.Implementations;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _context;
    
    public UserController(IUserRepository context)
    {
        _context = context;
    }
    
    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetUsers());
    }

    
    [HttpGet("{id}")]
    public ActionResult<User> GetUser(int id)
    {
        User? user = _context.GetUser(id);
        
        if (user == null)
        {
            return NotFound();
        }
        
        return user;
    }
}