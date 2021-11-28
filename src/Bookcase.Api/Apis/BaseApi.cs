namespace Bookcase.Apis;

public abstract class BaseApi : IApi
{
  private readonly string _baseUrl;

  public BaseApi(string baseUrl)
  {
    _baseUrl = baseUrl;
  }
  public abstract void Map(WebApplication app);

  protected string MakeUrl(string subPath = "")
  {
    if (string.IsNullOrWhiteSpace(subPath))
    {
      return _baseUrl;
    }

    return Path.Combine(_baseUrl, subPath).Replace("\\", "/");
  } 
}
