using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;
using TaskFlow.Api.Utils;

namespace TaskFlow.Api.Endpoints;

public static class RegisterUser
{
    public static void MapRegisterUserEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost(Endpoints.AuthRegisterEndpoint, async (AppDbContext db, RegisterUserRequest registerRequest) =>
        {
            if (!UserUtils.IsValidName(registerRequest.Name))
            {
                return Results.BadRequest();
            }
            
            if (!UserUtils.IsValidEmail(registerRequest.Email))
            {
                return Results.BadRequest();
            }

            User? checkUserByName = await db.Users.FirstOrDefaultAsync(user => user.Name == registerRequest.Name);
            if (checkUserByName != null)
            {
                return Results.Conflict("Username already in use");
            }
            
            User? checkUserByEmail = await db.Users.FirstOrDefaultAsync(user => user.Email == registerRequest.Email);
            if (checkUserByEmail != null)
            {
                return Results.Conflict("Email already in use");
            }

            User newUser = UserUtils.CreateUserFromParams(
                registerRequest.Name,
                registerRequest.Email,
                registerRequest.Password);
            
            db.Users.Add(newUser);
            await db.SaveChangesAsync();
            
            return Results.Ok();
        });
    }
}