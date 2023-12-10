namespace conversor_coin.Models.DTO;

public class CurrencyForUpdateDTO
{
    public int CurrencyId { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public double Value { get; set; }
    public string ImageUrl { get; set; }
}