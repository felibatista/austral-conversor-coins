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
    private readonly IUserService _userContext;
    private readonly APIException _apiException;
    private readonly IAuthService _authService;

    public UserController(IUserService userContext, APIException apiException, IAuthService authService)
    {
        this._userContext = userContext;
        this._apiException = apiException;
        this._authService = authService;
    }

    [Route("all")]
    [Authorize(Roles = "admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_userContext.GetUsers());
    }


    [HttpGet("{userId}")]
    public ActionResult<User> GetUser(int userId)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized();
        }

        if (_authService.getCurrentUser().Id == userId || _authService.getCurrentUser().Role == "admin")
        {
            try
            {
                User? user = _userContext.GetUser(userId);
                return Ok(user);
            }
            catch (Exception e)
            {
                Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

                return _apiException.getResultFromError(type, e.Data);
            }
        }

        return Unauthorized();
    }

    [HttpGet("getFull/{userId}")]
    public ActionResult<UserDTO> GetUserFull(int userId)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized();
        }

        if (_authService.getCurrentUser().Id == userId || _authService.getCurrentUser().Role == "admin")
        {
            try
            {
                UserDTO? user = _userContext.GetUserFull(userId);
                return Ok(user);
            }
            catch (Exception e)
            {
                Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

                return _apiException.getResultFromError(type, e.Data);
            }
        }

        return Unauthorized();
    }

    [HttpPost]
    public ActionResult<User> PostUser(UserForCreationDTO userForCreationDto)
    {
        try
        {
            _userContext.AddUser(userForCreationDto);
            return Ok("User created successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPut]
    [Authorize]
    public ActionResult<User> PutUser(UserForUpdateDTO userForUpdateDto)
    {
        try
        {
            _userContext.UpdateUser(userForUpdateDto);
            return Ok("User updated successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    /*
    Esta solicitud solo se podría aplicar cuando el usuario complete
    el pago de la suscripción, por lo que debería traer algun tipo de
    verificación de la api de el gestor de pagos. Se dejará para una
    futura implementación, ahora todos tienen acceso a cambiarse de suscripción
    */
    [HttpPut("subscription/{userId}")]
    public ActionResult<User> PutSubscriptionUser(SubscriptionUserUpdateDTO subscriptionUserUpdateDto)
    {
        try
        {
            _userContext.UpdateSubscriptionUser(subscriptionUserUpdateDto);
            return Ok("User subscription updated successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpDelete("{userId}")]
    [Authorize]
    public ActionResult<User> DeleteUser(int id)
    {
        try
        {
            _userContext.DeleteUser(id);
            return Ok("User deleted successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpGet("counter")]
    [Authorize]
    public ActionResult<int> counter()
    {
        int counter = _userContext.counter();
        return Ok(counter);
    }
    
    [HttpGet("page/{page}")]
    [Authorize]
    public ActionResult<List<User>> getUsersByPage(int page)
    {
        List<User> users = _userContext.getUsersByPage(page);
        return Ok(users);
    }
    
    [HttpGet("find/{input}")]
    [Authorize]
    public ActionResult<List<User>> findUserByInput(string input)
    {
        List<User> users = _userContext.findUserByInput(input);
        return Ok(users);
    }
}