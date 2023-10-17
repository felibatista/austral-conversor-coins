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
        return _context.Foreings.FirstOrDefault((foreing) => foreing.Id == id); 
    }

    public void AddForeing(ForeingForCreationDTO foreingForCreationDto)
    {
        Foreing foreing = new()
        {
            Name = foreingForCreationDto.Name,
            Value = foreingForCreationDto.Value,
            Code = foreingForCreationDto.Code
        };
        
        _context.Foreings.Add(foreing);
        _context.SaveChanges();
    }

    public void UpdateForeing(int id, Foreing foreing)
    {
        Foreing? toChange = GetForeing(id);
        
        if (toChange == null)
        {
            return;
        }   
        
        toChange.Name = foreing.Name;
        toChange.Value = foreing.Value;
        toChange.Code = foreing.Code;
        
        _context.Foreings.Update(toChange);
        _context.SaveChanges();
        
    }

    public void DeleteForeing(Foreing foreing)
    {
        _context.Foreings.Remove(foreing);
    }
}