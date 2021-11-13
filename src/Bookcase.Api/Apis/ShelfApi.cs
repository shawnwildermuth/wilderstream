using Bookcase.Services;

namespace Bookcase.Apis;

public class ShelfApi : BaseApi
{
  // Convert to Auth
  const string userId = "swildermuth";

  public ShelfApi() : base("/shelf") { }

  public override void Map(WebApplication app)
  {
    app.MapGet(MakeUrl(), Get);
    app.MapPost(MakeUrl("{bookId}"), Upsert);
    app.MapDelete(MakeUrl("{bookId}"), Delete);
  }

  async Task<IResult> Get(DataService svc)
  {
    var coll = await svc.GetShelfItemsAsync(userId);
    if (coll is null) return Results.NotFound();
    return Results.Ok(coll);
  }

  async Task<IResult> Upsert(string bookId, DataService svc)
  {
    var coll = await svc.UpsertShelfItemAsync(userId, bookId);
    if (coll is null) return Results.BadRequest("Duplicate Book ID");
    return Results.Created("", bookId);
  }

  async Task<IResult> Delete(string bookId, DataService svc)
  {
    if (await svc.DeleteShelfItemAsync(userId, bookId)) return Results.Ok();
    return Results.NotFound();
  }
}