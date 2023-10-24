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
    
    public ForeingController(IForeingRepository context)
    {
        _context = context;
    }
    
    [Route("all")]
    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetForeings());
    }
    
    [HttpGet("{foreingId}")]
    public ActionResult<Foreing> GetForeing(int foreingId)
    {
        Foreing? foreing = _context.GetForeing(foreingId);
        
        if (foreing == null)
        {
            return NotFound();
        }
        
        return foreing;
    }
    
    [HttpPost]
    public ActionResult<Foreing> PostForeing(ForeingForCreationDTO foreingForCreationDto)
    {
        _context.AddForeing(foreingForCreationDto);
        return Ok("Foreing created successfully");
    }
    
    [HttpPut("{foreingId}")]
    public ActionResult<Foreing> PutForeing(int foreingId, Foreing foreing)
    {
        if (foreingId != foreing.Id)
        {
            return BadRequest();
        }
        
        _context.UpdateForeing(foreingId, foreing);
        return Ok("Foreing updated successfully");
    }
    
    [HttpDelete("{foreingId}")]
    public ActionResult<Foreing> DeleteForeing(int foreingId)
    {
        Foreing? foreing = _context.GetForeing(foreingId);
        
        if (foreing == null)
        {
            return NotFound();
        }
        
        _context.DeleteForeing(foreing);
        return Ok("Foreing deleted successfully");
    }
    
    
    
    
}