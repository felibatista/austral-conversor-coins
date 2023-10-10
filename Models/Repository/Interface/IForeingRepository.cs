namespace conversor_coin.Models.Repository.Interface;

public interface IForeingRepository
{
    public List<Foreing> GetForeings();
    public Foreing GetForeing(int id);
    public void AddForeing(Foreing foreing);
    public void UpdateForeing(int id, Foreing foreing);
    public void DeleteForeing(Foreing foreing);
}