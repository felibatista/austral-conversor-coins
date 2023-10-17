namespace conversor_coin;

public class User
{
    public int Id {get; set;}
    public String Name {get; set;}
    public String Email {get; set;}
    public String Password {get; set;}
    public int coins { get; set; }
    public int apiUses { get; set; }
    
    public int subscriptionId { get; set; }
}