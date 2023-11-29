using System.ComponentModel.DataAnnotations;
using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class Auth
{
    [PrimaryKey]
    [ForeignKey(typeof(User))]
    public int Id {get; set;}
    public String Password {get; set;}
    public String Role { get; set; }
}