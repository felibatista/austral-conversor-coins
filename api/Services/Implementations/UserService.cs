using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace conversor_coin.Models.Repository.Implementations;

public class UserService : IUserService
{
    private readonly ConversorContext _context;

    public UserService(ConversorContext context)
    {
        _context = context;
    }

    public List<User> GetUsers()
    {
        return _context.Users
            .Include((user) => user.Subscription)
            .Include((user) => user.Auth)
            .ToList();
    }

    public User? GetUserId(int id)
    {
        return _context.Users.Include((user) => user.Subscription)
            .Include((user) => user.Auth).FirstOrDefault((users) => users.Id == id);
    }

    public User? GetUserEmail(string email)
    {
        return _context.Users.Include((user) => user.Subscription)
            .Include((user) => user.Auth).FirstOrDefault((users) => users.Email.ToLower() == email.ToLower());
    }

    public UserViewDTO AddUser(UserForCreationDTO userForCreationDto)
    {
        User user = new()
        {
            UserName = userForCreationDto.UserName,
            FirstName = userForCreationDto.FirstName,
            LastName = userForCreationDto.LastName,
            Email = userForCreationDto.Email,
            SubscriptionId = 1,
        };

        Auth auth = new()
        {
            Password = userForCreationDto.Password,
            Role = "User",
        };

        var authCreated = _context.Auth.Add(auth);
        _context.SaveChanges();

        user.Auth = authCreated.Entity;
        user.AuthId = authCreated.Entity.Id;

        var userCreated = _context.Users.Add(user);
        _context.SaveChanges();

        return new UserViewDTO
        {
            Email = userForCreationDto.Email,
            FirstName = userForCreationDto.FirstName,
            LastName = userForCreationDto.LastName,
            UserName = userForCreationDto.UserName,
            Id = userCreated.Entity.Id,
        };
    }

    public void UpdateSubscriptionUser(int userId, int subscriptionId)
    {
        var toChange = GetUserId(userId)!;

        toChange.Subscription =  _context.Subscriptions.FirstOrDefault((subscription) => subscription.Id == subscriptionId)!;

        _context.Users.Update(toChange);
        _context.SaveChanges();
    }

    public void UpdateUser(UserForUpdateDTO userForUpdateDto)
    {
        var toChange = GetUserId(userForUpdateDto.Id)!;

        if (userForUpdateDto.UserName != null)
        {
            toChange.UserName = userForUpdateDto.UserName;
        }
        
        if (userForUpdateDto.FirstName != null)
        {
            toChange.FirstName = userForUpdateDto.FirstName;
        }

        if (userForUpdateDto.LastName != null)
        {
            toChange.LastName = userForUpdateDto.LastName;
        }

        if (userForUpdateDto.Email != null)
        {
            toChange.Email = userForUpdateDto.Email;
        }

        _context.Users.Update(toChange);
        _context.SaveChanges();
    }

    public void DeleteUser(int userId)
    {
        var toRemove = GetUserId(userId)!;

        _context.Users.Remove(toRemove);
        _context.SaveChanges();
    }

    public int GetUsersCount()
    {
        return _context.Users.Count();
    }

    public List<User> GetUsersByPage(int page)
    {
        return _context.Users.Include((user) => user.Subscription)
            .Include((user) => user.Auth).Skip((page - 1) * 10).Take(10).ToList();
    }

    public List<User> FindUserByInput(string input)
    {
        return _context.Users.Include((user) => user.Subscription)
            .Include((user) => user.Auth)
            .Where((user) => user.UserName.ToLower().Replace(" ", "").Contains(input.ToLower().Replace(" ", "")))
            .Take(10).ToList();
    }
}