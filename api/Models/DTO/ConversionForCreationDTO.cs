namespace conversor_coin.Models.DTO;

public class ConversionForCreationDTO
{
    public int UserId { get; set; }
    public int FromCurrencyId { get; set; }
    public int ToCurrencyId { get; set; }
    public double Amount { get; set; }
}