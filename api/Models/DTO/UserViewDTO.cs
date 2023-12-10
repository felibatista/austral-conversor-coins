namespace conversor_coin.Models.DTO;

public class UserViewDTO
{
    public int Id { get; set; }
    public String UserName { get; set; }
    public String FirstName { get; set; }
    public String LastName { get; set; }
    public String Email { get; set; }  
    
    public SubscriptionForViewDTO Subscription { get; set; }
}