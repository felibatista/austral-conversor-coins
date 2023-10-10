using conversor_coin.Data;
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
    
    public void AddUser(User user)
    {
        _context.Users.Add(user);
    }

    public void UpdateUser(int id, User user)
    {
        User? toChange = GetUser(id);
        
        if (toChange == null)
        {
            return;
        }
        
        toChange.Name = user.Name;
        toChange.Email = user.Email;
        toChange.Password = user.Password;
        toChange.coins = user.coins;
        toChange.subscription = user.subscription;

        _context.Users.Update(toChange);
    }

    public void DeleteUser(User user)
    {
        _context.Users.Remove(user);
    }
}