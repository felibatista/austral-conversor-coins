namespace conversor_coin.Models.Repository.Interface;

public interface ISubscriptionRepository
{
    public List<Subscription> GetSubscriptions();
    public Subscription GetSubscription(int id);
    public void AddSubscription(Subscription subscription);
    public void UpdateSubscription(Subscription subscription);
    public void DeleteSubscription(Subscription subscription);
}