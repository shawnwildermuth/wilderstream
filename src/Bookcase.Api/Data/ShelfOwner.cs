namespace Bookcase.Api.Data;

public class ShelfOwner
{
  public string Id { get; set; } = "";
  public string Name {get;set;} = "";
  public ICollection<string> Shelf {get;set;} = new List<string>();
}