using conversor_coin.Models.DTO;

namespace conversor_coin.Models.Repository.Interface;

public interface ICurrencyService
{
    public List<Currency> GetCurrencies();
    public Currency? GetCurrencyId(int id);
    public Currency? GetCurrencyCode(string code);
    public Currency AddCurrency(CurrencyForCreationDTO currencyForCreationDto);
    public void UpdateCurrency(CurrencyForUpdateDTO currencyForUpdateDto);
    public void DeleteCurrency(int currencyId);
    public int GetCurrenciesCount();
    public List<Currency> GetCurrenciesByPage(int page);
}