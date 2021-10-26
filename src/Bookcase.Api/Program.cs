using Bookcase.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

var bldr = WebApplication.CreateBuilder(args);

// Any any services
bldr.Services.AddCors();
bldr.Services.AddScoped<DataService>();

var app = bldr.Build();

app.UseCors(cfg =>
{
  cfg.AllowAnyOrigin();
  cfg.AllowAnyMethod();
  cfg.AllowAnyHeader();
});

// Conver to Auth
const string userId = "swildermuth";

app.MapGet("/shelf", async (DataService svc) => {
  var coll = await svc.GetShelfItemsAsync(userId);
  if (coll is null) return Results.NotFound();
  return Results.Ok(coll);
});

app.MapPost("/shelf/item/{bookId}", async (string bookId, DataService svc) => {
  var coll = await svc.UpsertShelfItemAsync(userId, bookId);
  if (coll is null) return Results.BadRequest("Duplicate Book ID");
  return Results.Created("", bookId);
});

app.MapDelete("/shelf/item/{bookId}", async (string bookId, DataService svc) => {
  if (await svc.DeleteShelfItemAsync(userId, bookId)) return Results.Ok();
  return Results.NotFound();
});

app.Run();
