using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Endpoints;
using TaskFlow.Api.Utils;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=taskflow.db"));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
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

WebApplication app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapCreateTicketEndpoint();
app.MapDeleteTicketEndpoint();
app.MapGetTicketByIdEndpoint();
app.MapGetTicketsEndpoint();
app.MapMoveTicketEndpoint();
app.MapUpdateTicketEndpoint();
app.MapRegisterUserEndpoint();
app.MapLoginUserEndpoint();

app.Run();
