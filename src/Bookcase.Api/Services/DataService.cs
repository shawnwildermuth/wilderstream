using System.Linq;
using System.Net;
using Bookcase.Api.Data;
using Microsoft.AspNetCore.Http;

namespace Bookcase.Api.Services;

public class DataService
{
  private readonly Container _container;

  public DataService(IConfiguration config)
  {
    var options = new CosmosClientOptions()
    {
      SerializerOptions = new CosmosSerializationOptions()
      {
        PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase
      }
    };
    var client = new CosmosClient(config["Cosmos:ConnectionString"], options);
    _container = client.GetContainer(config["Cosmos:DbName"], config["Cosmos:ContainerName"]);
  }

  async Task<ShelfOwner?> GetShelfOwnerAsync(string userId)
  {
    var response = await this._container.ReadItemAsync<ShelfOwner>(userId, new PartitionKey(userId));
    return response.Resource;
  }

  public async Task<IEnumerable<string>?> GetShelfItemsAsync(string userId)
  {
    var user = await GetShelfOwnerAsync(userId);
    return user?.Shelf;
  }

  public async Task<IEnumerable<string>?> UpsertShelfItemAsync(string userId, string bookId)
  {
    var user = await GetShelfOwnerAsync(userId);
    if (user is null)
    {
      user = new ShelfOwner() { Id = userId, Name = "", Shelf = new List<string> { bookId } };
      await _container.CreateItemAsync<ShelfOwner>(user, new PartitionKey(userId));
    }
    else
    {
      if (user.Shelf.Contains(bookId)) return null;
      user.Shelf.Add(bookId);
      await _container.ReplaceItemAsync<ShelfOwner>(user, user.Id, new PartitionKey(user.Id));
    }
    return user.Shelf;
  }

  public async Task<bool> DeleteShelfItemAsync(string userId, string bookId)
  {
    var user = await GetShelfOwnerAsync(userId);
    if (user is not null)
    {
      if (user.Shelf.Contains(bookId))
      {
        user.Shelf.Remove(bookId);
        await _container.ReplaceItemAsync<ShelfOwner>(user, user.Id, new PartitionKey(user.Id));
        return true;
      }
    }
    return false;
  }
}