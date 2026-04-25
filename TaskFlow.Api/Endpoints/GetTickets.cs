using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;

namespace TaskFlow.Api.Endpoints;

public static class GetTickets
{
    public static void MapGetTicketsEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet(Endpoints.TicketsGeneralEndpoint, async (AppDbContext db) =>
        {
            return Results.Ok(await db.Tickets.ToListAsync());
        }).RequireAuthorization();
    }
}