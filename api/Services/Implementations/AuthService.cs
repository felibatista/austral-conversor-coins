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

    public Auth? Authenticate(UserForLoginDTO userForLoginDto)
    {
        var user = _context.Users.FirstOrDefault(x => x.Email.ToLower() == userForLoginDto.Email.ToLower());

        if (user == null)
        {
            return null;
        }

        return _context.Auth.FirstOrDefault(x => x.Password == userForLoginDto.Password && x.Id == user.Id);
    }

    public string GenerateToken(Auth auth)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim("userId",auth.Id.ToString()),
            new Claim("role",auth.Role)
        };
        var token = new JwtSecurityToken(_config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: credentials);
        
        return new JwtSecurityTokenHandler().WriteToken(token);    
    }
    
    public Auth? GetCurrentUser()
    {
        var claimPrincipal = _httpContextAccessor.HttpContext.User;
        
        if (claimPrincipal == null)
        {
            return null;
        }
        
        var identity = claimPrincipal.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            
            if (userClaims == null)
            {
                return null;
            }

            if (userClaims.FirstOrDefault(x => x.Type == "userId") == null)
            {
                return null;
            }
            return new Auth
            {
                Id = int.Parse(userClaims.FirstOrDefault(x => x.Type == "userId")?.Value),
                Role = userClaims.FirstOrDefault(x => x.Type == "role")?.Value
            };
        }
        return null;
    }

    public bool IsSameUserRequestId(int userId)
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            
            if (userClaims.FirstOrDefault(x => x.Type == "role")?.Value.ToLower() == "admin")
            {
                return true;
            }
            
            if (userClaims.FirstOrDefault(x => x.Type == "userId")?.Value != null)

            return int.Parse(userClaims.FirstOrDefault(x => x.Type == "userId")?.Value) == userId;
        }
        return false;
    }

    public bool IsSameUserRequestEmail(string email)
    {
        var identity = _httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
        if (identity != null)
        {
            var userClaims = identity.Claims;
            
            if (userClaims.FirstOrDefault(x => x.Type == "role")?.Value.ToLower() == "admin")
            {
                return true;
            }
            
            if (userClaims.FirstOrDefault(x => x.Type == "userId")?.Value != null)
            { 
                var userIdJwt = int.Parse(userClaims.FirstOrDefault(x => x.Type == "userId").Value);
                
                var user = _context.Users.FirstOrDefault(x => x.Id == userIdJwt && x.Email == email);
                
                if (user != null)
                {
                    return true;
                }
            }

        }
        return false;
    }
}