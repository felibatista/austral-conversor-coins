using conversor_coin.Models;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace conversor_coin.Controller;

[ApiController]
[Route("/api/[controller]")]
public class CurrencyController : ControllerBase
{
    private readonly ICurrencyService _context;

    public CurrencyController(ICurrencyService context)
    {
        _context = context;
    }

    [Route("all")]
    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.GetCurrencies());
    }

    [HttpGet("id/{currencyId}")]
    public ActionResult<Currency> GetCurrency(int currencyId)
    {
        if (_context.GetCurrencyId(currencyId) == null)
        {
            return NotFound(new
            {
                error = "Currency id not found"
            });
        }

        var currency = _context.GetCurrencyId(currencyId);
        return Ok(currency);
    }

    [HttpGet("code/{code}")]
    public ActionResult<Currency> GetCurrencyByCode(string code)
    {
        if (_context.GetCurrencyCode(code) == null)
        {
            return NotFound(new
            {
                error = "Currency code not found"
            });
        }

        var currency = _context.GetCurrencyCode(code);
        return Ok(currency);
    }

    [HttpPost]
    [Authorize(Policy = "Admin")]
    public ActionResult<Currency> PostCurrency(CurrencyForCreationDTO currencyForCreationDto)
    {
        if (_context.GetCurrencyCode(currencyForCreationDto.Code) != null)
        {
            return Conflict(new
            {
                error = "Currency code already exists"
            });
        }
        
        if (currencyForCreationDto.Value <= 0)
        {
            return Conflict(new
            {
                error = "Currency value must be greater than 0"
            });
        }
        
        if (currencyForCreationDto.Code.Length < 3)
        {
            return Conflict(new
            {
                error = "Currency code must be greater than 3 characters"
            });
        }
        
        if (currencyForCreationDto.Code.Length > 5)
        {
            return Conflict(new
            {
                error = "Currency code must be less than 5 characters"
            });
        }
        
        if (currencyForCreationDto.Name.Length < 3)
        {
            return Conflict(new
            {
                error = "Currency name must be greater than 3 characters"
            });
        }
        
        var currency = _context.AddCurrency(currencyForCreationDto);
        return Ok(currency);
    }

    [HttpPut]
    [Authorize(Policy = "Admin")]
    public ActionResult<Currency> PutCurrency(CurrencyForUpdateDTO currencyForUpdateDto)
    {
        if (_context.GetCurrencyId(currencyForUpdateDto.CurrencyId) == null)
        {
            return NotFound(new
            {
                error = "Currency id not found"
            });
        }
        
        if (_context.GetCurrencyCode(currencyForUpdateDto.Code) != null)
        {
            return Conflict(new
            {
                error = "Currency code already exists"
            });
        }
        
        if (currencyForUpdateDto.Value <= 0)
        {
            return Conflict(new
            {
                error = "Currency value must be greater than 0"
            });
        }
        
        if (currencyForUpdateDto.Code.Length < 3)
        {
            return Conflict(new
            {
                error = "Currency code must be greater than 3 characters"
            });
        }
        
        if (currencyForUpdateDto.Code.Length > 5)
        {
            return Conflict(new
            {
                error = "Currency code must be less than 5 characters"
            });
        }
        
        if (currencyForUpdateDto.Name.Length < 3)
        {
            return Conflict(new
            {
                error = "Currency name must be greater than 3 characters"
            });
        }

        _context.UpdateCurrency(currencyForUpdateDto);
        return Ok("Currency updated successfully");
    }

    [HttpDelete("{currencyId}")]
    [Authorize(Policy = "Admin")]
    public ActionResult<Currency> DeleteCurrency(int currencyId)
    {
        if (_context.GetCurrencyId(currencyId) == null)
        {
            return NotFound(new
            {
                error = "Currency id not found"
            });
        }

        _context.DeleteCurrency(currencyId);
        return Ok("Currency deleted successfully");
    }

    [HttpGet("count")]
    public ActionResult<Currency> GetCurrenciesCount()
    {
        int count = _context.GetCurrenciesCount();
        return Ok(count);
    }

    [HttpGet("page/{page}")]
    public ActionResult<Currency> GetCurrenciesByPage(int page)
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
        
        var currencies = _context.GetCurrenciesByPage(page);
        return Ok(currencies);
    }
}