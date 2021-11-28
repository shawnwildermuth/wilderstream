namespace Bookcase.Apis;

public class AuthApi : BaseApi
{
    public AuthApi() : base("/auth")
    {
    }

  public override void Map(WebApplication app)
  {
    app.MapPost("", PostCredentials);
    //app.MapPost("signin-msft", PostMicrosoftOAuth);
  }

  public IResult PostCredentials(CredentialsModel model, JwtService jwtService)
  {
    ArgumentNullException.ThrowIfNull(model.UserName, "UserName");
    ArgumentNullException.ThrowIfNull(model.Password, "Password");

    var user = new { Id = 1, FullName = "John Doe", UserName = "shawnwildermuth" };
    var (token, expiration) = jwtService.GenerateJwtToken(model.UserName);
    return Results.Ok(new { token, expiration, user });
  }

}
