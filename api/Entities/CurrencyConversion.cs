using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class CurrencyConversion
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    [ManyToOne (CascadeOperations = CascadeOperation.CascadeRead)]
    public Currency FromCurrency { get; set; } = null!;

    [ManyToOne (CascadeOperations = CascadeOperation.CascadeRead)]
    public Currency ToCurrency { get; set; } = null!;
    public DateTime Date { get; set; }
    public double Amount { get; set; }
    [ForeignKey(typeof(User))]
    public int UserId { get; set; }
}