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
    private readonly IConversionRepository _conversionContext;
    private readonly APIException _apiException;
    private readonly IAuthRepository _authRepository;

    public ConversionController(IConversionRepository conversionContext, APIException apiException, IAuthRepository authRepository)
    {
        _conversionContext = conversionContext;
        _apiException = apiException;
        _authRepository = authRepository;
    }

    [Route("all")]
    [Authorize(Roles = "admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_conversionContext.GetConversions());
    }

    [HttpGet("{userId}")]
    public ActionResult GetConversions(int userId, int limit)
    {
        if (!_authRepository.isSameUserRequest(userId))
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
        if (!_authRepository.isSameUserRequest(conversionForCreationDto.UserId))
        {
            return Unauthorized("You are not authorized to create a conversion for this user");
        }
        
        try
        {
            _conversionContext.addConversion(conversionForCreationDto);
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }

        return Ok("Conversion created successfully");
    }
}