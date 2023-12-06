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
    private readonly IForeingService _context;
    private readonly APIException _apiException;
    
    public ForeingController(IForeingService context, APIException apiException)
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
    [Authorize]
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
    [Authorize]
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
    [Authorize]
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
    
    [HttpGet("count")]
    public ActionResult<Foreing> GetForeingsCount()
    {
        try
        {
            int count = _context.getForeingsCount();
            return Ok(count);
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
    
    [HttpGet("page/{page}")]
    public ActionResult<Foreing> GetForeingsByPage(int page)
    {
        try
        {
            var foreings = _context.getForeingsByPage(page);
            return Ok(foreings);
        }catch (Exception e) {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}