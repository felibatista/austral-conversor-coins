using System.Runtime.InteropServices.JavaScript;
using Microsoft.VisualBasic;

namespace conversor_coin;

public class ForeingCoversion
{
    public int Id { get; set; }
    public int FromForeingId { get; set; }
    public int ToForeingId { get; set; }
    public DateTime Date { get; set; }
}