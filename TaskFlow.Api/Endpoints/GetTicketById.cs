using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;

namespace TaskFlow.Api.Endpoints;

public static class GetTicketById
{
    public static void MapGetTicketByIdEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet(Endpoints.TicketsWithIdEndpoint, async (AppDbContext db, int id) =>
        {
            Ticket? ticket = await db.Tickets.FirstOrDefaultAsync(ticket => ticket.Id == id);
            if (ticket == null)
            {
                return Results.NotFound();
            }
            
            return Results.Ok(ticket);
        });
    }
}