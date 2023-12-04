using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class ConversionController : ControllerBase
{
    private readonly IConversionService _conversionContext;
    private readonly APIException _apiException;
    private readonly IAuthService _authService;

    public ConversionController(IConversionService conversionContext, APIException apiException, IAuthService authService)
    {
        _conversionContext = conversionContext;
        _apiException = apiException;
        _authService = authService;
    }

    [Route("all")]
    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_conversionContext.GetConversions());
    }

    [HttpGet("{userId}")]
    public ActionResult GetConversions(int userId, int limit)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }

        if (!_authService.isSameUserRequest(userId))
        {
            return Unauthorized("You are not authorized to see this user's conversions");
        }
        
        try
        {
            List<ForeingCoversion> conversion = _conversionContext.GetConversionsFromUser(userId, limit);
            return Ok(conversion);
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPost]
    public ActionResult<ForeingCoversion> PostConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        if (_authService.getCurrentUser() == null)
        {
            return Unauthorized("You are not logged in");
        }
        
        if (!_authService.isSameUserRequest(conversionForCreationDto.UserId))
        {
            return Unauthorized("You are not authorized to create a conversion for this user");
        }
        
        try
        {
            var conversion = _conversionContext.addConversion(conversionForCreationDto);
            return Ok(conversion);
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}