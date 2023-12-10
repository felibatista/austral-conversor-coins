using conversor_coin.Data;
using conversor_coin.Models.DTO;
using conversor_coin.Models.Repository.Interface;

namespace conversor_coin.Models.Repository.Implementations;

public class SubscriptionService : ISubscriptionService
{
    private readonly ConversorContext _context;

    public SubscriptionService(ConversorContext context)
    {
        _context = context;
    }

    public List<Subscription> GetSubscriptions()
    {
        return _context.Subscriptions.ToList();
    }

    public Subscription? GetSubscriptionId(int id)
    {
        return _context.Subscriptions.FirstOrDefault((subscription) => subscription.Id == id);
    }

    public Subscription? GetSubscriptionName(string name)
    {
        return _context.Subscriptions.FirstOrDefault((subscription) => subscription.Name.ToLower() == name.ToLower());
    }

    public Subscription AddSubscription(SubscriptionForCreationDTO subscriptionForCreationDto)
    {
        Subscription subscription = new()
        {
            Name = subscriptionForCreationDto.Name,
            Limit = subscriptionForCreationDto.Limit
        };

        var subscriptionCreated = _context.Subscriptions.Add(subscription);
        _context.SaveChanges();

        return subscriptionCreated.Entity;
    }

    public void UpdateSubscription(SubscriptionForUpdateDTO subscriptionForUpdateDto)
    {
        var subscription = GetSubscriptionId(subscriptionForUpdateDto.Id)!;

        subscription.Name = subscriptionForUpdateDto.Name;
        subscription.Limit = subscriptionForUpdateDto.Limit;
        subscription.Price = subscriptionForUpdateDto.Price;

        _context.Subscriptions.Update(subscription);
        _context.SaveChanges();
    }

    public void DeleteSubscription(int subscriptionId)
    {
        var subscription = GetSubscriptionId(subscriptionId)!;

        _context.Subscriptions.Remove(subscription);
        _context.SaveChanges();
    }
}