namespace Bookcase.Data;

public class TokenConfiguration
{
  public string Issuer { get; set; } = "http://localhost";
  public string Audience { get; set; } = "*";
  public string? Secret { get; set; }
  public int ExpirationLength {get;set;} = 1200;
}
