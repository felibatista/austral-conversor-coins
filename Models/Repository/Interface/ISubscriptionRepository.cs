namespace conversor_coin.Models.Repository.Interface;

public interface ISubscriptionRepository
{
    public List<Subscription> GetSubscriptions();
    public Subscription GetSubscription(int id);
    public Subscription AddSubscription(Subscription subscription);
    public Subscription UpdateSubscription(Subscription subscription);
    public void DeleteSubscription(Subscription subscription);
}