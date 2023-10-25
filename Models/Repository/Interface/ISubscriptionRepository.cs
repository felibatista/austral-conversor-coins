using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface ISubscriptionRepository
{
    public List<Subscription> GetSubscriptions();
    public Subscription GetSubscription(int id);
    public void AddSubscription(SubscriptionForCreationDTO subscriptionForCreationDto);
    public void UpdateSubscription(SubscriptionForUpdateDTO subscriptionForUpdateDto);
    public void DeleteSubscription(int subscriptionId);
}