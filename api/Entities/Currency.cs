using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class Currency
{
    public int Id { get; set; }
    public String Name { get; set; }
    [MaxLength(5)]
    public String Code { get; set; }
    public double Value { get; set; }
    public String ImageUrl { get; set; }
}