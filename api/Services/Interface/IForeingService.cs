using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IForeingService
{
    public List<Foreing> GetForeings();
    public Foreing GetForeing(int id);
    public void AddForeing(ForeingForCreationDTO foreingForCreationDto);
    public void UpdateForeing(ForeingForUpdateDTO foreingForUpdateDto);
    public void DeleteForeing(int foreingId);
    public int getForeingsCount();
    public List<Foreing> getForeingsByPage(int page);
}