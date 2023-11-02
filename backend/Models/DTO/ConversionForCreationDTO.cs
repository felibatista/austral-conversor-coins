namespace conversor_coin.Models.DTO;

public class ConversionForCreationDTO
{
    public int UserId { get; set; }
    public int FromForeingId { get; set; }
    public int ToForeingId { get; set; }
    public double Amount { get; set; }
}