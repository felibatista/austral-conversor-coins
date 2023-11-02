using conversor_coin.Data;
using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Implementations;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userContext;
    private readonly APIException _apiException;
    
    public UserController(IUserRepository _userContext, APIException apiException)
    {
        this._userContext = _userContext;
        this._apiException = apiException;
    }
    
    [Route("all")]
    [Authorize(Roles = "admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_userContext.GetUsers());
    }


    [HttpGet("{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> GetUser(int id)
    {
        try
        {
            User? user = _userContext.GetUser(id);
            return user;
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPost]
    public ActionResult<User> PostUser(UserForCreationDTO userForCreationDto)
    {
        try
        {
            _userContext.AddUser(userForCreationDto);
            return Ok("User created successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }

    }
    
    [HttpPut("{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> PutUser(UserForUpdateDTO userForUpdateDto)
    {
        try
        {
            _userContext.UpdateUser(userForUpdateDto);
            return Ok("User updated successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpPut("subscription/{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> PutSubscriptionUser(SubscriptionUserUpdateDTO subscriptionUserUpdateDto)
    {
        try
        {
            _userContext.UpdateSubscriptionUser(subscriptionUserUpdateDto);
            return Ok("User subscription updated successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpDelete("{userId}")]
    [Authorize(Roles = "admin")]
    public ActionResult<User> DeleteUser(int id)
    {
        try
        {
            _userContext.DeleteUser(id);
            return Ok("User deleted successfully");
        }catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}