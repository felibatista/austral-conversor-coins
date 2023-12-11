using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userContext;
    private readonly IAuthService _authService;
    private readonly ISubscriptionService _subscriptionService;

    public UserController(IUserService userContext, IAuthService authService, ISubscriptionService subscriptionService)
    {
        _userContext = userContext;
        _authService = authService;
        _subscriptionService = subscriptionService;
    }

    [Route("all")]
    [Authorize(Policy = "Admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userContext.GetUsers();
        var formattedUsers = users.ConvertAll(user => new UserViewDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Subscription = new SubscriptionForViewDTO()
            {
                Id = user.Subscription.Id,
                Name = user.Subscription.Name,
                Price = user.Subscription.Price,
            }
        });
        
        return Ok(formattedUsers);
    }


    [HttpGet("id/{userId}")]
    public ActionResult<UserViewDTO> GetUserId(int userId)
    {
        if (_authService.GetCurrentUser() == null)
        {
            return Unauthorized(new { error = "You are not logged in" });
        }

        if (!_authService.IsSameUserRequestId(userId) && _authService.GetCurrentUser()!.Role != "admin")
        {
            return Unauthorized(new { error = "You are not authorized to see this user's information" });
        }

        if (_userContext.GetUserId(userId) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }

        var user = _userContext.GetUserId(userId);
        var formattedUser = new UserViewDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Subscription = new SubscriptionForViewDTO()
            {
                Id = user.Subscription.Id,
                Name = user.Subscription.Name,
                Price = user.Subscription.Price,
            }
        };
        return Ok(formattedUser);
    }

    [HttpGet("email/{email}")]
    public ActionResult<UserViewDTO> GetUserEmail(string email)
    {
        if (_authService.GetCurrentUser() == null)
        {
            return Unauthorized(new { error = "You are not logged in" });
        }

        if (!_authService.IsSameUserRequestEmail(email) && _authService.GetCurrentUser()!.Role != "admin")
        {
            return Unauthorized(new { error = "You are not authorized to see this user's information" });
        }

        if (_userContext.GetUserEmail(email) == null)
        {
            return NotFound(new
            {
                error = "User email not found"
            });
        }

        var user = _userContext.GetUserEmail(email);
        var formattedUser = new UserViewDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Subscription = new SubscriptionForViewDTO()
            {
                Id = user.Subscription.Id,
                Name = user.Subscription.Name,
                Price = user.Subscription.Price,
            }
        };
        return Ok(formattedUser);
    }
    
    [HttpGet("check/{email}")]
    public ActionResult<bool> CheckUserEmail(string email)
    {
        var check = _userContext.GetUserEmail(email);
        
        if (check == null)
        {
            return Ok(false);
        }
        
        return Ok(true);
    }

    [HttpPut]
    [Authorize(Policy = "Admin")]
    public ActionResult<User> PutUser(UserForUpdateDTO userForUpdateDto)
    {
        if (_userContext.GetUserId(userForUpdateDto.Id) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }

        if (userForUpdateDto.Email != null)
        {
            if (_userContext.GetUserEmail(userForUpdateDto.Email) != null)
            {
                return Conflict(new
                {
                    error = "User email already exists"
                });
            }
        }
        
        _userContext.UpdateUser(userForUpdateDto);
        return Ok("User updated successfully");
    }

    /*
    Esta solicitud solo se podría aplicar cuando el usuario complete
    el pago de la suscripción, por lo que debería traer algun tipo de
    verificación de la api de el gestor de pagos. Se dejará para una
    futura implementación, ahora todos tienen acceso a cambiarse de suscripción
    */
    [HttpPut("subscription/{userId}")]
    public ActionResult<User> PutSubscriptionUser(int userId, int subscriptionId)
    {
        if (_userContext.GetUserId(userId) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }
        
        if (_subscriptionService.GetSubscriptionId(subscriptionId) == null)
        {
            return NotFound(new
            {
                error = "Subscription id not found"
            });
        }
        
        _userContext.UpdateSubscriptionUser(userId, subscriptionId);
        return Ok("User subscription updated successfully");
    }

    [HttpDelete("{userId}")]
    [Authorize(Policy = "Admin")]
    public ActionResult<User> DeleteUser(int userId)
    {
        if (_userContext.GetUserId(userId) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }
        
        _userContext.DeleteUser(userId);
        return Ok("User deleted successfully");
    }

    [HttpGet("counter")]
    [Authorize(Policy = "Admin")]
    public ActionResult<int> Counter()
    {
        var counter = _userContext.GetUsersCount();
        return Ok(counter);
    }

    [HttpGet("page/{page}")]
    [Authorize]
    public ActionResult<List<UserViewDTO>> GetUsersByPage(int page)
    {
        if (page <= 0)
        {
            return BadRequest(new
            {
                error = "Page must be greater than 0"
            });
        }
        
        if (page != (int)page)
        {
            return BadRequest(new
            {
                error = "Page must be an integer"
            });
        }
        
        var users = _userContext.GetUsersByPage(page);
        var usersFormatted = users.ConvertAll(user => new UserViewDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Subscription = new SubscriptionForViewDTO()
            {
                Id = user.Subscription.Id,
                Name = user.Subscription.Name,
                Price = user.Subscription.Price,
            }
        });
        return Ok(usersFormatted);
    }

    [HttpGet("find/{input}")]
    [Authorize]
    public ActionResult<List<UserViewDTO>> FindUserByInput(string input)
    {
        var users = _userContext.FindUserByInput(input);
        var formattedUsers = users.ConvertAll(user => new UserViewDTO()
        {
            Id = user.Id,
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Subscription = new SubscriptionForViewDTO()
            {
                Id = user.Subscription.Id,
                Name = user.Subscription.Name,
                Price = user.Subscription.Price,
            }
        });
        return Ok(formattedUsers);
    }
}