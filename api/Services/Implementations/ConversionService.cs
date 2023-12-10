using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.VisualBasic;

namespace conversor_coin.Models.Repository.Implementations;

public class ConversionService : IConversionService
{
    private readonly ConversorContext _context;

    public ConversionService(ConversorContext context)
    {
        _context = context;
    }

    public List<CurrencyConversion> GetConversions()
    {
        //include all the data from foreings;
        return _context.CurrencyConversion
            .Include((conversion) => conversion.FromCurrency)
            .Include((conversion) => conversion.ToCurrency)
            .ToList();
    }

    public List<CurrencyConversion> GetConversionsFromUser(int userId, int limit)
    {
        if (limit == 0)
        {
            return _context.CurrencyConversion.Where((conversion) => conversion.UserId == userId)
                .Include((conversion) => conversion.FromCurrency)
                .Include((conversion) => conversion.ToCurrency).ToList();
        }

        return _context.CurrencyConversion.Where((conversion) => conversion.UserId == userId)
            .Include((conversion) => conversion.FromCurrency)
            .Include((conversion) => conversion.ToCurrency).Take(limit).ToList();
    }

    public CurrencyConversion AddConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        var user = _context.Users.FirstOrDefault((user) => user.Id == conversionForCreationDto.UserId)!;
        var temporalUserCurrencyList =
            _context.CurrencyConversion.Where((conversion) => conversion.UserId == user.Id).ToList();

        var fromCurrency =
            _context.Currency.FirstOrDefault((currency) => currency.Id == conversionForCreationDto.FromCurrencyId)!;
        var toCurrency =
            _context.Currency.FirstOrDefault((currency) => currency.Id == conversionForCreationDto.ToCurrencyId)!;

        CurrencyConversion conversion = new()
        {
            Amount = conversionForCreationDto.Amount,
            Date = DateTime.Now,
            ToCurrency = toCurrency,
            FromCurrency = fromCurrency
        };

        temporalUserCurrencyList.Add(conversion);
        user.Conversions = temporalUserCurrencyList;
        _context.SaveChanges();

        return conversion;
    }

    public int GetConversionsCount()
    {
        return _context.CurrencyConversion.Count();
    }

    public List<CurrencyConversion> GetConversionsByPage(int page)
    {
        return _context.CurrencyConversion
            .Include((conversion) => conversion.FromCurrency)
            .Include((conversion) => conversion.ToCurrency)
            .Skip((page - 1) * 10)
            .Take(10)
            .ToList();
    }
}