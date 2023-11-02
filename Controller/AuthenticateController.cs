using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class AuthenticateController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly IAuthService _authService;

    public AuthenticateController(IConfiguration config, IAuthService authService)
    {
        _config = config;
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost]
    public ActionResult Login(UserForLoginDTO userForLoginDto)
    {
        var user = _authService.Authenticate(userForLoginDto);
        
        if (user != null)
        {
            var token = _authService.GenerateToken(user);
            return Ok(token);
        }

        return NotFound("User not found");
    }
}