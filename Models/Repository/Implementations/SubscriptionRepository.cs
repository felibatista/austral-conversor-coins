using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;

namespace conversor_coin.Models.Repository.Implementations;

public class SubscriptionRepository : ISubscriptionRepository
{
    private readonly ConversorContext _context;

    public SubscriptionRepository(ConversorContext context)
    {
        _context = context;
    }

    public List<Subscription> GetSubscriptions()
    {
        return _context.Subscriptions.ToList();
    }

    public Subscription GetSubscription(int id)
    {
        Subscription? subscription = _context.Subscriptions.FirstOrDefault((subscription) => subscription.Id == id);

        if (subscription == null)
        {
            throw APIException.CreateException(
                APIException.Code.SB_01,
                "Subscription not found",
                APIException.Type.NOT_FOUND);
        }

        return subscription;
    }

    public void AddSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        if (_context.Subscriptions.FirstOrDefault(
                (subscription) => subscription.Name == subscriptionForCreationDto.Name) != null)
        {
            throw APIException.CreateException(
                APIException.Code.SB_02,
                "Subscription name already exists",
                APIException.Type.BAD_REQUEST);
        }

        Subscription subscription = new()
        {
            Name = subscriptionForCreationDto.Name,
            Limit = subscriptionForCreationDto.Limit
        };

        try
        {
            _context.Subscriptions.Add(subscription);
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

    public void UpdateSubscription(SubscriptionForUpdateDTO subscriptionForUpdateDto)
    {
        if (_context.Subscriptions.FirstOrDefault(
                (subscription) => subscription.Name == subscriptionForUpdateDto.Name) != null)
        {
            throw APIException.CreateException(
                APIException.Code.SB_02,
                "Subscription name already exists",
                APIException.Type.BAD_REQUEST);
        }

        Subscription? subscription = GetSubscription(subscriptionForUpdateDto.Id);

        subscription.Name = subscriptionForUpdateDto.Name;
        subscription.Limit = subscriptionForUpdateDto.Limit;
        subscription.Price = subscriptionForUpdateDto.Price;

        try
        {
            _context.Subscriptions.Update(subscription);
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

    public void DeleteSubscription(int subscriptionId)
    {
        Subscription? subscription = GetSubscription(subscriptionId);

        try
        {
            _context.Subscriptions.Remove(subscription);
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