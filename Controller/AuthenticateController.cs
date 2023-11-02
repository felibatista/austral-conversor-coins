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
    private readonly IAuthRepository _authRepository;

    public AuthenticateController(IConfiguration config, IAuthRepository authRepository)
    {
        _config = config;
        _authRepository = authRepository;
    }

    [AllowAnonymous]
    [HttpPost]
    public ActionResult Login(UserLoginDTO userLoginDto)
    {
        var user = _authRepository.Authenticate(userLoginDto);
        
        if (user != null)
        {
            var token = _authRepository.GenerateToken(user);
            return Ok(token);
        }

        return NotFound("User not found");
    }
}