using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TaskFlow.Api.Data;
using TaskFlow.Api.Endpoints;
using TaskFlow.Api.Utils;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

string connectionString;
string? databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

if (databaseUrl != null)
{
    Uri uri = new Uri(databaseUrl);
    string[] userInfo = uri.UserInfo.Split(':');
    int port = uri.Port > 0 ? uri.Port : 5432;
    connectionString = $"Host={uri.Host};Port={port};Database={uri.AbsolutePath.TrimStart('/')};" +
                       $"Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
}
else
{
    connectionString = "Host=postgres;Database=taskflow;Username=taskflow;Password=taskflow-dev-2026";
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString,
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(maxRetryCount: 5)));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        string[] origins = (Environment.GetEnvironmentVariable("ALLOWED_ORIGINS")
            ?? "http://localhost:5173,http://localhost").Split(",");
        policy.WithOrigins(origins)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

string? jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrEmpty(jwtKey))
{
    bool autoCreate = builder.Configuration["auto-create-jwt"] == "true";

    if (autoCreate)
    {
        jwtKey = SystemUtils.GenerateJwtKey();
    }
    else
    {
        throw new Exception("JWT key not found. Run server with '--auto-create-jwt true' flag or set Jwt:Key");
    }
}

builder.Services.AddSingleton(new JwtSettings(jwtKey));

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddHealthChecks();

WebApplication app = builder.Build();

using (IServiceScope scope = app.Services.CreateScope())
{
    AppDbContext db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapCreateTicketEndpoint();
app.MapDeleteTicketEndpoint();
app.MapGetTicketByIdEndpoint();
app.MapGetTicketsEndpoint();
app.MapMoveTicketEndpoint();
app.MapUpdateTicketEndpoint();
app.MapRegisterUserEndpoint();
app.MapLoginUserEndpoint();

app.MapHealthChecks("/health");

app.Run();
