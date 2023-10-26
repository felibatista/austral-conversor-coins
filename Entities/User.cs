using Microsoft.VisualBasic;
using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class User
{
    [PrimaryKey, AutoIncrement]
    public int Id {get; set;}
    public String UserName {get; set;}
    public String FirstName {get; set;}
    public String LastName {get; set;}
    public String Email {get; set;}
    public String Password {get; set;}

    [OneToMany(CascadeOperations = CascadeOperation.All)]
    public List<ForeingCoversion> Conversions { get; set; }
    [ForeignKey(typeof(Subscription))]
    public int SubscriptionId { get; set; }
}