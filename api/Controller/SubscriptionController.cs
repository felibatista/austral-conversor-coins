using System.Security.Claims;
using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class SubscriptionController : ControllerBase
{
    private readonly ISubscriptionService _context;

    public SubscriptionController(ISubscriptionService context)
    {
        _context = context;
    }

    [Route("all")]
    [Authorize(Policy = "Admin")]
    [HttpGet]
    public IActionResult GetAll()
    {
        var subscriptions = _context.GetSubscriptions();
        
        var formattedSubscriptions = subscriptions.ConvertAll(subscription => new SubscriptionForViewDTO
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Limit = subscription.Limit,
            Price = subscription.Price
        });
        
        return Ok(formattedSubscriptions);
    }

    [HttpGet("{subscriptionId}")]
    public ActionResult<Subscription> GetSubscription(int subscriptionId)
    {
        if (_context.GetSubscriptionId(subscriptionId) == null)
        {
            return NotFound(new
            {
                error = "Subscription id not found"
            });
        }
        
        var subscription = _context.GetSubscriptionId(subscriptionId);
        var formattedSubscription = new SubscriptionForViewDTO
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Limit = subscription.Limit,
            Price = subscription.Price
        };
        
        return Ok(formattedSubscription);
    }

    [Authorize(Policy = "Admin")]
    [HttpPost]
    public ActionResult<Subscription> PostSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        if (_context.GetSubscriptionName(subscriptionForCreationDto.Name) != null)
        {
            return Conflict(new
            {
                error = "Subscription name already exists"
            });
        }
        
        if (subscriptionForCreationDto.Limit <= -1)
        {
            return Conflict(new
            {
                error = "Subscription limit must be greater than  -1"
            });
        }
        
        if (subscriptionForCreationDto.Price <= 0)
        {
            return Conflict(new
            {
                error = "Subscription price must be greater than 0"
            });
        }

        var subscription = _context.AddSubscription(subscriptionForCreationDto);
        var formattedSubscription = new SubscriptionForViewDTO
        {
            Id = subscription.Id,
            Name = subscription.Name,
            Limit = subscription.Limit,
            Price = subscription.Price
        };
        return Ok(formattedSubscription);
    }

    [HttpPut]
    [Authorize(Policy = "Admin")]
    public ActionResult<Subscription> PutSubscription(SubscriptionForUpdateDTO subscriptionForUpdateDto)
    {
        if (_context.GetSubscriptionId(subscriptionForUpdateDto.Id) == null)
        {
            return NotFound(new
            {
                error = "Subscription id not found"
            });
        }

        if (_context.GetSubscriptionName(subscriptionForUpdateDto.Name) != null)
        {
            return Conflict(new
            {
                error = "Subscription name already exists"
            });
        }
        
        if (subscriptionForUpdateDto.Limit <= -1)
        {
            return Conflict(new
            {
                error = "Subscription limit must be greater than  -1"
            });
        }
        
        if (subscriptionForUpdateDto.Price <= 0)
        {
            return Conflict(new
            {
                error = "Subscription price must be greater than 0"
            });
        }

        _context.UpdateSubscription(subscriptionForUpdateDto);
        return Ok("Subscription updated successfully");
    }

    [HttpDelete("{subscriptionId}")]
    [Authorize(Policy = "Admin")]
    public ActionResult<Subscription> DeleteSubscription(int subscriptionId)
    {
        if (_context.GetSubscriptionId(subscriptionId) == null)
        {
            return NotFound(new
            {
                error = "Subscription id not found"
            });
        }

        _context.DeleteSubscription(subscriptionId);
        return Ok("Subscription deleted successfully");
    }
}