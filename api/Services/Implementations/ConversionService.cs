using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
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
    
    public List<ForeingCoversion> GetConversions()
    {
        return _context.ForeingCoversion.ToList();
    }

    public List<ForeingCoversion> GetConversionsFromUser(int userId, int limit)
    {
        User? user = _context.Users.FirstOrDefault((user) => user.Id == userId);
        
        if (user == null)
        {
            throw APIException.CreateException(
                APIException.Code.US_01, 
                "User not found", 
                APIException.Type.NOT_FOUND);
        }
        
        List<ForeingCoversion> conversions = _context.ForeingCoversion.Where((conversions) => conversions.UserId == userId).ToList();
        
        //no se chequea que está vacío para que devuelva un array vacio y no un error
        if (conversions == null)
        {
            throw APIException.CreateException(
                APIException.Code.CV_01, 
                "User conversions not found",
                APIException.Type.NOT_FOUND);
        }

        if (limit == 0)
        {
            return conversions.ToList();
        }
        
        if (limit > 0)
        {
            return conversions.Take(limit).ToList();
        }
        
        return conversions;
    }

    public ForeingCoversion addConversion(ConversionForCreationDTO conversionForCreationDto)
    {
        User? user = _context.Users.FirstOrDefault((user) => user.Id == conversionForCreationDto.UserId);
        
        if (user == null)
        {
            throw APIException.CreateException(
                APIException.Code.US_01, 
                "User not found", 
                APIException.Type.NOT_FOUND);
        }
        
        if (_context.Foreings.FirstOrDefault((foreing) => foreing.Id == conversionForCreationDto.ToForeingId) == null)
        {
            throw APIException.CreateException(
                APIException.Code.CV_03, 
                "Foreing To not found", 
                APIException.Type.NOT_FOUND
                );
        }
        if (_context.Foreings.FirstOrDefault((foreing) => foreing.Id == conversionForCreationDto.FromForeingId) == null)
        {
            throw APIException.CreateException(
                APIException.Code.CV_04, 
                "Foreing From not found",
                APIException.Type.NOT_FOUND);
        }
        
        List<ForeingCoversion> temporalUserForeingList = _context.ForeingCoversion.Where((conversions) => conversions.UserId == user.Id).ToList();
        
        int planLimit = _context.Subscriptions.First((subscription) => subscription.Id == user.SubscriptionId)
            .Limit;
        
        if (planLimit == 0 || planLimit == null)
        {
            throw APIException.CreateException(
                APIException.Code.SB_01,
                "User plan not found",
                APIException.Type.NOT_FOUND
            );
        }
      
        if (planLimit != -1 && temporalUserForeingList.Count >= planLimit)
        {
            throw APIException.CreateException(
                APIException.Code.US_02, 
                "User limit reached", 
                APIException.Type.FORBIDDEN);
        }
        
        ForeingCoversion conversion = new()
        {
            FromForeingId = conversionForCreationDto.FromForeingId,
            ToForeingId = conversionForCreationDto.ToForeingId,
            Amount = conversionForCreationDto.Amount,
            Date = DateTime.Now
        };

        try
        {
            EntityEntry<ForeingCoversion> conversionCreated = _context.ForeingCoversion.Add(conversion);

            temporalUserForeingList.Add(conversionCreated.Entity);

            user.Conversions = temporalUserForeingList;
        }
        catch (Exception e)
        {
            throw APIException.CreateException(
                APIException.Code.DB_01, 
                "An error occurred while setting the data in the database",
                APIException.Type.INTERNAL_SERVER_ERROR);
        }

        try
        {
            _context.SaveChanges();
        }
        catch (Exception e){
            throw APIException.CreateException(
                APIException.Code.DB_02,
                "An error occurred while saving the data in the database",
                APIException.Type.INTERNAL_SERVER_ERROR);
        }

        return conversion;
    }
}