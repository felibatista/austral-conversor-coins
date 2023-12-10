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

    public AuthenticateController(IAuthService authService, IUserService userService)
    {
        _authService = authService;
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public ActionResult Register(UserForCreationDTO userForCreationDto)
    {
        var userEmail = _userService.GetUserEmail(userForCreationDto.Email);
        
        if (userEmail != null)
        {
            return Conflict(new
            {
                error = "Email already exists"
            });
        }

        var user = _userService.AddUser(userForCreationDto);

        return Ok(user);
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public ActionResult Login(UserForLoginDTO userForLoginDto)
    {
        var user = _authService.Authenticate(userForLoginDto);

        if (user is null)
        {
            return NotFound(new
            {
                error = "Username or password incorrect"
            });
        }

        var token = _authService.GenerateToken(user);

        return Ok(new
        {
            token,
            userId = user.Id
        });
    }
}