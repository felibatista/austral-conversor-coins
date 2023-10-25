using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;

namespace conversor_coin.Models.Repository.Implementations;

public class ForeingRepository : IForeingRepository
{
    private readonly ConversorContext _context;

    public ForeingRepository(ConversorContext context)
    {
        _context = context;
    }

    public List<Foreing> GetForeings()
    {
        return _context.Foreings.ToList();
    }

    public Foreing GetForeing(int id)
    {
        Foreing? foreing = _context.Foreings.FirstOrDefault((foreing) => foreing.Id == id);

        if (foreing == null)
        {
            throw APIException.CreateException(
                APIException.Code.FG_01,
                "Foreing not found",
                APIException.Type.NOT_FOUND);
        }

        return foreing;
    }

    public void AddForeing(ForeingForCreationDTO foreingForCreationDto)
    {
        if (_context.Foreings.FirstOrDefault((foreing) => foreing.Code == foreingForCreationDto.Code) != null)
        {
            throw APIException.CreateException(
                APIException.Code.FG_02,
                "Foreing code already exists",
                APIException.Type.BAD_REQUEST);
        }

        Foreing foreing = new()
        {
            Name = foreingForCreationDto.Name,
            Value = foreingForCreationDto.Value,
            Code = foreingForCreationDto.Code
        };

        try
        {
            _context.Foreings.Add(foreing);
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
        catch (Exception e)
        {
            throw APIException.CreateException(
                APIException.Code.DB_02,
                "An error occurred while saving the data in the database",
                APIException.Type.INTERNAL_SERVER_ERROR);
        }
    }

    public void UpdateForeing(ForeingForUpdateDTO foreingForUpdateDto)
    {
        Foreing? toChange = GetForeing(foreingForUpdateDto.Id);

        if (toChange == null)
        {
            return;
        }

        if (_context.Foreings.FirstOrDefault((foreing) => foreing.Code == foreingForUpdateDto.Code) != null)
        {
            throw APIException.CreateException(
                APIException.Code.FG_02,
                "Foreing code already exists",
                APIException.Type.BAD_REQUEST);
        }

        toChange.Name = foreingForUpdateDto.Name;
        toChange.Value = foreingForUpdateDto.Value;
        toChange.Code = foreingForUpdateDto.Code;

        try
        {
            _context.Foreings.Update(toChange);
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
        catch (Exception e)
        {
            throw APIException.CreateException(
                APIException.Code.DB_02,
                "An error occurred while saving the data in the database",
                APIException.Type.INTERNAL_SERVER_ERROR);
        }
    }

    public void DeleteForeing(int foreingId)
    {
        Foreing? toRemove = GetForeing(foreingId);

        try
        {
            _context.Foreings.Remove(toRemove);
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
        catch (Exception e)
        {
            throw APIException.CreateException(
                APIException.Code.DB_02,
                "An error occurred while saving the data in the database",
                APIException.Type.INTERNAL_SERVER_ERROR);
        }
    }
}