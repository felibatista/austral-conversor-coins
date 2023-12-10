using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IUserService
{
    public List<User> GetUsers();
    public User? GetUserId(int userId);
    public User? GetUserEmail(string email);
    public UserViewDTO AddUser(UserForCreationDTO userForCreationDto);
    public void UpdateUser(UserForUpdateDTO userForUpdateDto);
    public void UpdateSubscriptionUser(int userId, int subscriptionId);
    public void DeleteUser(int userId);
    public int GetUsersCount();
    public List<User> GetUsersByPage(int page);
    public List<User> FindUserByInput(string input);
}