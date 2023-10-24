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
    
    public ConversionController(IConversionRepository conversionContext, IForeingRepository foreingContext)
    {
        _conversionContext = conversionContext;
        _foreingContext = foreingContext;
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
        List<ForeingCoversion> conversion = _conversionContext.GetConversionsFromUser(userId, limit);
        
        if (conversion == null)
        {
            return NotFound();
        }

        return Ok(conversion);
    }
    
    [HttpPost]
    public ActionResult<ForeingCoversion> PostConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        if (_foreingContext.GetForeing(conversionForCreationDto.ToForeingId) == null)
        {
            return NotFound("To Foreing not found");
        }
        
        if (_foreingContext.GetForeing(conversionForCreationDto.FromForeingId) == null)
        {
            return NotFound("From Foreing not found");
        }

        try
        {
            _conversionContext.addConversion(conversionForCreationDto);
        }catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        
        return Ok("Conversion created successfully");
    }
}