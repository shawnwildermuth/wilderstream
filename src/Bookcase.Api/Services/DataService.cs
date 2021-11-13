namespace Bookcase.Services;

public class DataService
{
  private readonly ContainerFactory _factory;

  public DataService(ContainerFactory factory)
  {
    _factory = factory;
  }

  async Task<ShelfOwner?> GetShelfOwnerAsync(string userId)
  {
    try
    {
      var container = await _factory.Get();
      var response = await container.ReadItemAsync<ShelfOwner?>(userId, new PartitionKey(userId));
      return response.Resource;
    }
    catch
    {
      return null;
    }
  }

  public async Task<IEnumerable<string>?> GetShelfItemsAsync(string userId)
  {
    var user = await GetShelfOwnerAsync(userId);
    return user?.Shelf;
  }

  public async Task<IEnumerable<string>?> UpsertShelfItemAsync(string userId, string bookId)
  {
    var container = await _factory.Get();
    var user = await GetShelfOwnerAsync(userId);
    if (user is null)
    {
      user = new ShelfOwner() { Id = userId, Name = "", Shelf = new List<string> { bookId } };
      await container.CreateItemAsync<ShelfOwner>(user, new PartitionKey(userId));
    }
    else
    {
      if (user.Shelf.Contains(bookId)) return null;
      user.Shelf.Add(bookId);
      await container.ReplaceItemAsync<ShelfOwner>(user, user.Id, new PartitionKey(user.Id));
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
        var container = await _factory.Get();
        await container.ReplaceItemAsync<ShelfOwner>(user, user.Id, new PartitionKey(user.Id));
        return true;
      }
    }
    return false;
  }
}