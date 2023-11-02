using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface IAuthRepository
{
    public Auth Authenticate(UserLoginDTO userLoginDto);
    public string GenerateToken(Auth auth);
    public Auth getCurrentUser();
    public Boolean isSameUserRequest(int userId);
}