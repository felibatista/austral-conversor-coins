namespace conversor_coin.Models.DTO;

public class UserForUpdateDTO
{
    public int UserToChangeID { get; set; }
    public String FirstName { get; set; }
    public String LastName { get; set; }
    public String Email { get; set; }
}