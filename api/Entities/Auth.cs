using System.ComponentModel.DataAnnotations;
using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class Auth
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set;}
    public String Password {get; set;}
    public String Role { get; set; }    
    public User User { get; set; } = null!;
}