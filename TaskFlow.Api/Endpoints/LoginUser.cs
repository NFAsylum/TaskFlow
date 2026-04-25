using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;
using TaskFlow.Api.Utils;

namespace TaskFlow.Api.Endpoints;

public static class LoginUser
{
    public static void MapLoginUserEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost(Endpoints.AuthLoginEndpoint, async (AppDbContext db, LoginUserRequest loginRequest, JwtSettings jwtSettings) =>
        {
            if (!UserUtils.IsValidEmail(loginRequest.Email))
            {
                return Results.BadRequest();
            }

            User? user = await db.Users.FirstOrDefaultAsync(user => user.Email == loginRequest.Email);
            if (user == null)
            {
                return Results.Unauthorized();
            }
            
            if (!UserUtils.IsValidPassword(loginRequest.Password, user.PasswordHash))
            {
                return Results.Unauthorized();
            }

            Claim[] claims = new[]
            {
                new Claim("sub", user.Id.ToString()),
                new Claim("name", user.Name),
                new Claim("email", user.Email)
            };
            
            SymmetricSecurityKey key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.Key));
            SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials);
            
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            
            return Results.Ok(new { Token = tokenString });
        });
    }
}