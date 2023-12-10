using conversor_coin.Models.DTO;
using Microsoft.VisualBasic;

namespace conversor_coin.Models.Repository.Interface;

public interface IConversionService
{
    public List<CurrencyConversion> GetConversions();
    public List<CurrencyConversion> GetConversionsFromUser(int userId, int limit);
    public CurrencyConversion AddConversion(ConversionForCreationDTO conversionForCreationDto);
    public List<CurrencyConversion> GetConversionsByPage(int page);
    public int GetConversionsCount();
}