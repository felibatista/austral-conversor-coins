using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IAuthService
{
    public Auth Authenticate(UserForLoginDTO userForLoginDto);
    public string GenerateToken(Auth auth);
    public Auth getCurrentUser();
    public Boolean isSameUserRequest(int userId);
}