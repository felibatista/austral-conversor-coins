using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class ConversionController : ControllerBase
{
    private readonly IConversionRepository _conversionContext;
    private readonly IForeingRepository _foreingContext;
    private readonly APIException _apiException;
    
    public ConversionController(IConversionRepository conversionContext, IForeingRepository foreingContext, APIException apiException)
    {
        _conversionContext = conversionContext;
        _foreingContext = foreingContext;
        _apiException = apiException;
    }
    
    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_conversionContext.GetConversions());
    }
    
    [HttpGet("{userId}")]
    public ActionResult GetConversions(int userId, int limit)
    {
        try
        {
            List<ForeingCoversion> conversion = _conversionContext.GetConversionsFromUser(userId, limit);
            
            return Ok(conversion);
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpPost]
    public ActionResult<ForeingCoversion> PostConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        try
        {
            _conversionContext.addConversion(conversionForCreationDto);
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
        
        return Ok("Conversion created successfully");
    }
}