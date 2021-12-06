using System.Security.Claims;
using System.Security.Principal;
using Bookcase.Services;

namespace Bookcase.Apis;

public class ShelfApi : BaseApi
{
  public ShelfApi() : base("/shelf") { }

  public override void Map(WebApplication app)
  {
    app.MapGet(MakeUrl(), Get);
    app.MapPost(MakeUrl("item/{bookId}"), Upsert);
    app.MapDelete(MakeUrl("item/{bookId}"), Delete);
  }

  async Task<IResult> Get(DataService svc, ClaimsPrincipal principal)
  {
    if (principal.Identity?.Name is null) return Results.Unauthorized();
    var coll = await svc.GetShelfItemsAsync(principal.Identity.Name ?? "");
    if (coll is null) return Results.NotFound();
    return Results.Ok(coll);
  }

  async Task<IResult> Upsert(string bookId, DataService svc, ClaimsPrincipal principal)
  {
    if (principal.Identity?.Name is null) return Results.Unauthorized();
    var coll = await svc.UpsertShelfItemAsync(principal.Identity.Name, bookId);
    if (coll is null) return Results.BadRequest("Duplicate Book ID");
    return Results.Created("", bookId);
  }

  async Task<IResult> Delete(string bookId, DataService svc, ClaimsPrincipal principal)
  {
    if (principal.Identity?.Name is null) return Results.Unauthorized();
    if (await svc.DeleteShelfItemAsync(principal.Identity.Name, bookId)) return Results.Ok();
    return Results.NotFound();
  }
}