using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.VisualBasic;

namespace conversor_coin.Models.Repository.Implementations;

public class ConversionRepository : IConversionRepository
{
    private readonly ConversorContext _context;
    
    public ConversionRepository(ConversorContext context)
    {
        _context = context;
    }
    
    public List<ForeingCoversion> GetConversions()
    {
        return _context.ForeingCoversion.ToList();
    }

    public List<ForeingCoversion> GetConversionsFromUser(int userId, int limit)
    {
        return _context.Users.FirstOrDefault((user) => user.Id == userId).Conversions.Take(limit).ToList();
    }

    public void addConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        User? user = _context.Users.FirstOrDefault((user) => user.Id == conversionForCreationDto.UserId);
        
        if (user == null)
        {
            throw new Exception("User not found");
        }
        
        List<ForeingCoversion> temporalUserForeingList = _context.ForeingCoversion.ToList();
        
        ForeingCoversion conversion = new()
        {
            FromForeingId = conversionForCreationDto.FromForeingId,
            ToForeingId = conversionForCreationDto.ToForeingId,
            Amount = conversionForCreationDto.Amount,
            Date = DateTime.Now
        };
        
        EntityEntry<ForeingCoversion> conversionCreated = _context.ForeingCoversion.Add(conversion);
        temporalUserForeingList.Add(conversionCreated.Entity);

        user.Conversions = temporalUserForeingList;
        
        _context.SaveChanges();
    }
}