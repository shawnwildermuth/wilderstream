using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Bookcase.Services;

public class JwtService
{
  private readonly TokenConfiguration _config;

  public JwtService(IConfiguration config)
  {
    _config = new TokenConfiguration();
    config.Bind("TokenAuth", _config);
  }


  public (string, DateTime) GenerateJwtToken(string email)
  {
    if (_config.Secret is null) throw new InvalidOperationException("Jwt Token Must Be Set");

    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_config.Secret);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
      Subject = new ClaimsIdentity(new Claim[]
        {
          new Claim(ClaimTypes.Email, email)
        }),
      Expires = DateTime.UtcNow.AddSeconds(_config.ExpirationLength),
      SigningCredentials = new SigningCredentials(
        new SymmetricSecurityKey(key), 
        SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return (tokenHandler.WriteToken(token), tokenDescriptor.Expires ?? DateTime.UtcNow);
  }
}