using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private readonly ISubscriptionRepository _context;
    
    public SubscriptionController(ISubscriptionRepository context)
    {
        _context = context;
    }
    
    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetSubscriptions());
    }
    
    [HttpGet("{id}")]
    public ActionResult<Subscription> GetSubscription(int id)
    {
        Subscription? subscription = _context.GetSubscription(id);
        
        if (subscription == null)
        {
            return NotFound();
        }
        
        return subscription;
    }
    
    [HttpPost]
    public ActionResult<Subscription> PostSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        _context.AddSubscription(subscriptionForCreationDto);
        return Ok("Subscription created successfully");
    }

    [HttpPut("{id}")]
    public ActionResult<Subscription> PutSubscription(int id, Subscription subscription)
    {
        if (id != subscription.Id)
        {
            return BadRequest();
        }
        
        _context.UpdateSubscription(subscription);
        return Ok("Subscription updated successfully");
    }

    [HttpDelete("{id}")]
    public ActionResult<Subscription> DeleteSubscription(int id)
    {
        Subscription? subscription = _context.GetSubscription(id);
        
        if (subscription == null)
        {
            return NotFound();
        }
        
        _context.DeleteSubscription(subscription);
        return Ok("Subscription deleted successfully");
    }
        
    
}