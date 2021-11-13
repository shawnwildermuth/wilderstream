namespace Bookcase.Services;

public class ContainerFactory
{
  private Container? _container;
  private readonly IHostEnvironment _env;
  private readonly IConfiguration _config;

  public ContainerFactory(IHostEnvironment env, IConfiguration config)
  {
    _env = env;
    _config = config;
  }

  public async Task<Container> Get()
  {
    if (_container == null)
    {
      var options = new CosmosClientOptions()
      {
        SerializerOptions = new CosmosSerializationOptions()
        {
          PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
        }
      };
      var client = new CosmosClient(_config["Cosmos:ConnectionString"], options);
      if (_env.IsDevelopment())
      {
        var db = await client.CreateDatabaseIfNotExistsAsync(_config["Cosmos:DbName"]);
        if (db?.StatusCode == HttpStatusCode.OK || db?.StatusCode == HttpStatusCode.Created)
        {
          await db.Database.CreateContainerIfNotExistsAsync("Shelves", "/id");
        }
      }
      _container = client.GetContainer(_config["Cosmos:DbName"],
                                       _config["Cosmos:ContainerName"]);
    }

    return _container;
  }


}