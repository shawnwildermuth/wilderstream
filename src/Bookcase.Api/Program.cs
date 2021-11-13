using System.Reflection;

var bldr = WebApplication.CreateBuilder(args);
RegisterServices(bldr);
var app = bldr.Build();

app.UseCors(cfg =>
{
  cfg.AllowAnyOrigin();
  cfg.AllowAnyMethod();
  cfg.AllowAnyHeader();
});

RegisterApis(app);

app.Run();

void RegisterServices(WebApplicationBuilder bldr)
{
  // Any any services
  bldr.Services.AddCors();
  bldr.Services.AddTransient<ContainerFactory>();
  bldr.Services.AddScoped<DataService>();

  Assembly.GetExecutingAssembly().GetTypes()
    .Where(t => t.GetInterfaces().Contains(typeof(IApi)) &&
                t.IsAbstract == false)
    .ToList()
    .ForEach(t => bldr.Services.AddTransient(typeof(IApi), t));
}

void RegisterApis(WebApplication app)
{
  var apis = app.Services.GetServices<IApi>();
  foreach (var api in apis) api?.Map(app);
}