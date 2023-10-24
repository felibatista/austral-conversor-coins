using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IForeingRepository
{
    public List<Foreing> GetForeings();
    public Foreing GetForeing(int id);
    public void AddForeing(ForeingForCreationDTO foreingForCreationDto);
    public void UpdateForeing(ForeingForUpdateDTO foreingForUpdateDto);
    public void DeleteForeing(int foreingId);
}