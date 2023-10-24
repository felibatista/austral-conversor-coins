using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;

namespace conversor_coin.Models.Repository.Implementations;

public class UserRepository : IUserRepository
{
    private readonly ConversorContext _context;
    
    public UserRepository (ConversorContext context)
    {
        _context = context;
    }
    
    public List<User> GetUsers()
    {
        return _context.Users.ToList();
    }

    public User GetUser(int id)
    {
        return _context.Users.FirstOrDefault((user) => user.Id == id);
    }

    public User GetUser(string email)
    {
        return _context.Users.FirstOrDefault((user) => user.Email == email);
    }
    
    public void AddUser(UserForCreationDTO userForCreationDto)
    {
        User user = new()
        {
            UserName = userForCreationDto.UserName,
            FirstName = userForCreationDto.FirstName,
            LastName = userForCreationDto.LastName,
            Email = userForCreationDto.Email,
            Password = userForCreationDto.Password,
            Coins = 0,
            SubscriptionId = 0
        };
        
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public void UpdateSubscriptionUser(SubscriptionUpdateDTO subscriptionUpdateDto)
    {
        User? toChange = GetUser(subscriptionUpdateDto.UserId);

        if (toChange.SubscriptionId == subscriptionUpdateDto.SubscriptionId)
        {
            return;
        }

        if (_context.Subscriptions.FirstOrDefault((subscription) => subscription.Id == subscriptionUpdateDto.SubscriptionId) == null)
        {
            return;
        }

        toChange.SubscriptionId = subscriptionUpdateDto.SubscriptionId;
        
        _context.Users.Update(toChange);
        _context.SaveChanges();
    }

    public void UpdateUser(UserForUpdateDTO userForUpdateDto)
    {
        User? toChange = GetUser(userForUpdateDto.UserToChangeID);
        
        if (toChange == null)
        {
            return;
        }
        
        toChange.FirstName = userForUpdateDto.FirstName;
        toChange.LastName = userForUpdateDto.LastName;
        toChange.Email = userForUpdateDto.Email;
        toChange.Password = userForUpdateDto.Password;
        toChange.Coins = userForUpdateDto.Coins;

        _context.Users.Update(toChange);
        _context.SaveChanges(); 
    }

    public void DeleteUser(User user)
    {
        _context.Users.Remove(user);
    }
}