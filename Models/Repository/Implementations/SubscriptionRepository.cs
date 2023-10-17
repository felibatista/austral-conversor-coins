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
        return _context.Subscriptions.FirstOrDefault((subscription) => subscription.Id == id);
    }

    public void AddSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        Subscription subscription = new()
        {
            Name = subscriptionForCreationDto.Name,
            Limit = subscriptionForCreationDto.Limit
        };
        
        _context.Subscriptions.Add(subscription);
        _context.SaveChanges();
    }

    public void UpdateSubscription(Subscription subscription)
    {
        _context.Subscriptions.Update(subscription);
        _context.SaveChanges();
    }

    public void DeleteSubscription(Subscription subscription)
    {
        _context.Subscriptions.Remove(subscription);
        _context.SaveChanges();
    }
}