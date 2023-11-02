using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace conversor_coin.Models.Repository.Implementations;

public class AuthService : IAuthService
{
    private readonly ConversorContext _context;
    private readonly IConfiguration _config;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AuthService(ConversorContext context, IConfiguration config, IHttpContextAccessor httpContextAccessor)
    {
        _context = context;
        _config = config;
        _httpContextAccessor = httpContextAccessor;
    }

    public Auth Authenticate(UserForLoginDTO userForLoginDto)
    {
        var user = _context.Users.FirstOrDefault(x => x.UserName.ToLower() == userForLoginDto.Username.ToLower());
        var password = _context.Auth.FirstOrDefault(x => x.Password == userForLoginDto.Password && x.Id == user.Id);
       
        if (user != null && password != null)
        {
            return password;
        }

        return null;
    }

    public string GenerateToken(Auth auth)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier,auth.Id.ToString()),
            new Claim(ClaimTypes.Role,auth.Role)
        };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: credentials);
        
        return new JwtSecurityTokenHandler().WriteToken(token);    
    }
    
    public Auth getCurrentUser()
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            return new Auth
            {
                Id = int.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value),
                Role = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
            };
        }
        return null;
    }

    public bool isSameUserRequest(int userId)
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            
            if (userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value.ToLower() == "admin")
            {
                return true;
            }
            
            if (userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value != null)

            return int.Parse(userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value) == userId;
        }
        return false;
    }
}