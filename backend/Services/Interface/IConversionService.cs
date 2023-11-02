using conversor_coin.Models.DTO;
using Microsoft.VisualBasic;

namespace conversor_coin.Models.Repository.Interface;

public interface IConversionService
{
    public List<ForeingCoversion> GetConversions();
    public List<ForeingCoversion> GetConversionsFromUser(int userId, int limit);
    public void addConversion(ConversionForCreationDTO conversionForCreationDto);
}