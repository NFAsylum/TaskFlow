using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;

namespace TaskFlow.Api.Endpoints;

public static class GetTickets
{
    public static void MapGetTicketsEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/tickets", async (AppDbContext db) =>
        {
            return Results.Ok(await db.Tickets.ToListAsync());
        });
    }
}