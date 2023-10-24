using Microsoft.VisualBasic;
using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class User
{
    [PrimaryKey, AutoIncrement]
    public int Id {get; set;}
    public String Name {get; set;}
    public String Email {get; set;}
    //hashed password
    public String Password {get; set;}
    public int coins { get; set; }
    [OneToMany(CascadeOperations = CascadeOperation.All)]
    public List<ForeingCoversion> conversions { get; set; }
    [ForeignKey(typeof(Subscription))]
    public int subscriptionId { get; set; }
}