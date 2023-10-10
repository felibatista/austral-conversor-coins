using conversor_coin.Data;
using conversor_coin.Models.DTO;
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
        
        TypesSubscription subTypes = TypesExtensions.fromInt(user.subscriptionId);
        
        return user;
    }
    
    [HttpGet("/subscription/{id}")]
    public ActionResult<User> GetUserSubscription(int id)
    {
        User? user = _context.GetUser(id);
        
        if (user == null)
        {
            return NotFound();
        }
        
        TypesSubscription subTypes = TypesExtensions.fromInt(user.subscriptionId);
        
        return Ok(TypesExtensions.ToFriendlyString(subTypes));
    }
    
    [HttpPost]
    public ActionResult<User> PostUser(UserForCreationDTO userForCreationDto)
    {
        _context.AddUser(userForCreationDto);
        return Ok("User created successfully");
    }
    
}