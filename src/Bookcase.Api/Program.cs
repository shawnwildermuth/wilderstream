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

app.UseAuthentication();

RegisterApis(app);

app.Run();

void RegisterServices(WebApplicationBuilder bldr)
{
  // Any any services
  bldr.Services.AddCors();
  bldr.Services.AddTransient<ContainerFactory>();
  bldr.Services.AddScoped<DataService>();
  bldr.Services.AddTransient<JwtService>();

  // Authentication
  bldr.Services.AddAuthentication().AddMicrosoftAccount(opt =>
  {
    opt.ClientId = bldr.Configuration["Authentication:Microsoft:ClientId"];
    opt.ClientSecret = bldr.Configuration["Authentication:Microsoft:ClientSecret"];
    opt.CallbackPath = "/auth/signin-msft";
  });

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