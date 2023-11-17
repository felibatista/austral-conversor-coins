using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using conversor_coin.Data;
using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class AuthenticateController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IUserService _userService;
    private readonly APIException _apiException;

    public AuthenticateController(IAuthService authService, IUserService userService, APIException apiException)
    {
        _authService = authService;
        _userService = userService;
        _apiException = apiException;
    }
    
    [AllowAnonymous]
    [HttpPost("register")]
    public ActionResult Register(UserForCreationDTO userForCreationDto)
    {
        try
        {
            var user = _userService.AddUser(userForCreationDto);
            var token = "";
            
            if (user.UserName != null)
            {
                var userForLoginDto = new UserForLoginDTO()
                {
                    Username = userForCreationDto.UserName,
                    Password = userForCreationDto.Password
                };
                
                var auth = _authService.Authenticate(userForLoginDto);
                token = _authService.GenerateToken(auth);
            }
            var response = new
            {
                token = token,
                userId = user.Id
            };
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public ActionResult Login(UserForLoginDTO userForLoginDto)
    {
        var user = _authService.Authenticate(userForLoginDto);
        
        if (user != null)
        {
            var token = _authService.GenerateToken(user);
            
            var response = new
            {
                token = token,
                userId = user.Id
            };
            
            return Ok(response);
        }
        
        var error = new
        {
            error = "Username or password incorrect"
        };

        return NotFound(error);
    }
}