var builder = WebApplication.CreateBuilder(args);

// Any any services
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
}

app.UseCors(cfg =>
{
  if (app.Environment.IsDevelopment())
  {
    cfg.AllowAnyOrigin();
    cfg.AllowAnyMethod();
    cfg.AllowAnyHeader();
  }
});


app.MapGet("/shelf", () => new[] { "OL64468W", "OL103134W" });

app.Run();
