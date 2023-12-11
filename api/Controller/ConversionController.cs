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
    private readonly ISubscriptionService _subscriptionService;
    private readonly ICurrencyService _currencyService;
    private readonly IUserService _userService;
    private readonly IAuthService _authService;

    public ConversionController(IConversionService conversionContext, IAuthService authService, ISubscriptionService subscriptionService, IUserService userService, ICurrencyService currencyService)
    {
        _conversionContext = conversionContext;
        _authService = authService;
        _userService = userService;
        _currencyService = currencyService;
        _subscriptionService = subscriptionService;
    }

    [Route("all")]
    [Authorize(Policy = "Admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_conversionContext.GetConversions());
    }

    [HttpGet("{userId}")]
    public ActionResult GetConversions(int userId, int limit)
    {
        if (_authService.GetCurrentUser() == null)
        {
            return Unauthorized(new { error = "You are not logged in" });
        }

        if (!_authService.IsSameUserRequestId(userId))
        {
            return Unauthorized(new { error = "You are not authorized to see this user's conversions" });
        }
        
        if (_userService.GetUserId(userId) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }

        var conversions = _conversionContext.GetConversionsFromUser(userId, limit);
        return Ok(conversions);
    }

    [HttpPost]
    public ActionResult<CurrencyConversion> PostConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        if (_authService.GetCurrentUser() == null)
        {
            return Unauthorized(new { error = "You are not logged in" });
        }
        
        if (!_authService.IsSameUserRequestId(conversionForCreationDto.UserId))
        {
            return Unauthorized(new { error = "You are not authorized to see this user's conversions" });
        }
        
        if (_userService.GetUserId(conversionForCreationDto.UserId) == null)
        {
            return NotFound(new
            {
                error = "User id not found"
            });
        }
        
        var user = _userService.GetUserId(conversionForCreationDto.UserId)!;
        
        if (_currencyService.GetCurrencyId(conversionForCreationDto.ToCurrencyId) == null)
        {
            return NotFound(new
            {
                error = "To Currency id not found"
            });
        }
        
        if (_currencyService.GetCurrencyId(conversionForCreationDto.FromCurrencyId) == null)
        {
            return NotFound(new
            {
                error = "From Currency id not found"
            });
        }
        
        if (conversionForCreationDto.Amount <= 0)
        {
            return BadRequest(new
            {
                error = "Amount must be greater than 0"
            });
        }
        
        if (_subscriptionService.GetSubscriptionId(user.SubscriptionId) == null)
        {
            return BadRequest(new
            {
                error = "User must have a subscription"
            });
        }
        
        var planLimit = _subscriptionService.GetSubscriptionId(user.SubscriptionId)!.Limit;
        var userConversions = _conversionContext.GetConversionsFromUser(conversionForCreationDto.UserId, 0).Count;
        
        if (userConversions >= planLimit && planLimit != -1)
        {
            return BadRequest(new
            {
                error = "User has reached the limit of conversions"
            });
        }

        var conversion = _conversionContext.AddConversion(conversionForCreationDto);
        return Ok(conversion);
    }

    [Authorize(Policy = "Admin")]
    [HttpGet("page/{page}")]
    public ActionResult<CurrencyConversion> GetConversionsByPage(int page)
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
        
        var conversion = _conversionContext.GetConversionsByPage(page);

        return Ok(conversion);
    }

    [Authorize(Policy = "Admin")]
    [HttpGet("count")]
    public ActionResult<CurrencyConversion> GetConversionsCount()
    {
        var conversion = _conversionContext.GetConversionsCount();
        return Ok(conversion);
    }
}