using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;

namespace conversor_coin.Models.Repository.Implementations;

public class CurrencyService : ICurrencyService
{
    private readonly ConversorContext _context;

    public CurrencyService(ConversorContext context)
    {
        _context = context;
    }

    public List<Currency> GetCurrencies()
    {
        return _context.Currency.ToList();
    }

    public Currency? GetCurrencyId(int id)
    {
        return _context.Currency.FirstOrDefault((foreing) => foreing.Id == id);
    }

    public Currency? GetCurrencyCode(string code)
    {
        return _context.Currency.FirstOrDefault((foreing) => foreing.Code.ToLower() == code.ToLower());
    }

    public Currency AddCurrency(CurrencyForCreationDTO currencyForCreationDto)
    {
        Currency currency = new()
        {
            Name = currencyForCreationDto.Name,
            Value = currencyForCreationDto.Value,
            Code = currencyForCreationDto.Code,
            ImageUrl = currencyForCreationDto.ImageUrl
        };

        var currencyCreated = _context.Currency.Add(currency);
        _context.SaveChanges();

        return currencyCreated.Entity;
    }

    public void UpdateCurrency(CurrencyForUpdateDTO currencyForUpdateDto)
    {
        var toChange = GetCurrencyId(currencyForUpdateDto.CurrencyId)!;

        toChange.Name = currencyForUpdateDto.Name;
        toChange.Value = currencyForUpdateDto.Value;
        toChange.Code = currencyForUpdateDto.Code;
        toChange.ImageUrl = currencyForUpdateDto.ImageUrl;

        _context.Currency.Update(toChange);
        _context.SaveChanges();
    }

    public void DeleteCurrency(int currencyId)
    {
        var toRemove = GetCurrencyId(currencyId)!;

        _context.Currency.Remove(toRemove);
        _context.SaveChanges();
    }

    public int GetCurrenciesCount()
    {
        return _context.Currency.Count();
    }

    public List<Currency> GetCurrenciesByPage(int page)
    {
        return _context.Currency.Skip((page - 1) * 10).Take(10).ToList();
    }
}