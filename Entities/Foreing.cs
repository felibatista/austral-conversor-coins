using SQLite;

namespace conversor_coin;

public class Foreing
{
    public int Id { get; set; }
    public String Name { get; set; }
    [MaxLength(5)]
    public String Code { get; set; }
    public double Value { get; set; }
}