using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IAuthService
{
    public Auth? Authenticate(UserForLoginDTO userForLoginDto);
    public string GenerateToken(Auth auth);
    public Auth? GetCurrentUser();
    public bool IsSameUserRequestId(int userId);
    public bool IsSameUserRequestEmail(string email);
}