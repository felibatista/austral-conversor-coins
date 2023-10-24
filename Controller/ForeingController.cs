using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class ForeingController : ControllerBase
{
    private readonly IForeingRepository _context;
    private readonly APIException _apiException;
    
    public ForeingController(IForeingRepository context, APIException apiException)
    {
        _context = context;
        _apiException = apiException;
    }
    
    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetForeings());
    }
    
    [HttpGet("{foreingId}")]
    public ActionResult<Foreing> GetForeing(int foreingId)
    {
        try
        {
            Foreing foreing = _context.GetForeing(foreingId);
            
            return Ok(foreing);
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpPost]
    public ActionResult<Foreing> PostForeing(ForeingForCreationDTO foreingForCreationDto)
    {
        try
        {
            _context.AddForeing(foreingForCreationDto);
            return Ok("Foreing created successfully");
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpPut]
    public ActionResult<Foreing> PutForeing(ForeingForUpdateDTO foreingForUpdateDto)
    {
        try
        { 
            _context.UpdateForeing(foreingForUpdateDto);
            return Ok("Foreing updated successfully");
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpDelete("{foreingId}")]
    public ActionResult<Foreing> DeleteForeing(int foreingId)
    {
        try
        {
          _context.DeleteForeing(foreingId);
        return Ok("Foreing deleted successfully");
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}