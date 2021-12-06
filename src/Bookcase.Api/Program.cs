using System.Reflection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Web;

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
app.UseAuthorization();

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
  bldr.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(jwt => {}, opt =>
  {
    opt.Instance = "https://login.microsoftonline.com/consumers/";
    opt.TenantId = "consumers";
    opt.ClientId = bldr.Configuration["Authentication:Microsoft:ClientId"];
    opt.ClientSecret = bldr.Configuration["Authentication:Microsoft:ClientSecret"];
  });

  // Secure by default
  bldr.Services.AddAuthorization(cfg =>
  {
    cfg.FallbackPolicy = new AuthorizationPolicyBuilder()
      .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
      .RequireAuthenticatedUser()
      .Build();
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