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
    private readonly APIException _apiException;

    public SubscriptionController(ISubscriptionService context, APIException apiException)
    {
        _context = context;
        _apiException = apiException;
    }

    [Route("all")]
    [Authorize]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetSubscriptions());
    }

    [HttpGet("{subscriptionId}")]
    public ActionResult<Subscription> GetSubscription(int subscriptionId)
    {
        try
        {
            Subscription? subscription = _context.GetSubscription(subscriptionId);
            return subscription;
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPost]
    [Authorize]
    public ActionResult<Subscription> PostSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        try
        {
            _context.AddSubscription(subscriptionForCreationDto);
            return Ok("Subscription created successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpPut]
    [Authorize]
    public ActionResult<Subscription> PutSubscription(SubscriptionForUpdateDTO subscriptionForUpdateDto)
    {
        try
        {
            _context.UpdateSubscription(subscriptionForUpdateDto);
            return Ok("Subscription updated successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }

    [HttpDelete("{subscriptionId}")]
    [Authorize]
    public ActionResult<Subscription> DeleteSubscription(int subscriptionId)
    {
        try
        {
            _context.DeleteSubscription(subscriptionId);
            return Ok("Subscription deleted successfully");
        }
        catch (Exception e)
        {
            Enum.TryParse(e.Data["type"].ToString(), out APIException.Type type);

            return _apiException.getResultFromError(type, e.Data);
        }
    }
}