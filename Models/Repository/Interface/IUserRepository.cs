namespace conversor_coin.Models.Repository.Interface;

public interface IUserRepository
{
    public List<User> GetUsers();
    public User GetUser(int id);
    public User GetUser(String email);
    public void AddUser(User user);
    public void UpdateUser(int id, User user);
    public void DeleteUser(User user);
}