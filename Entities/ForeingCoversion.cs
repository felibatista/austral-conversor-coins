using System.Runtime.InteropServices.JavaScript;
using Microsoft.VisualBasic;
using SQLite;
using SQLiteNetExtensions.Attributes;

namespace conversor_coin;

public class ForeingCoversion
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    [ForeignKey(typeof(Foreing))]
    public int FromForeingId { get; set; }
    [ForeignKey(typeof(Foreing))]
    public int ToForeingId { get; set; }
    public DateTime Date { get; set; }
    public double Amount { get; set; }
}