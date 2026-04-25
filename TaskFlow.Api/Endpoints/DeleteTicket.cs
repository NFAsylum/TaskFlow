using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;

namespace TaskFlow.Api.Endpoints;

public static class DeleteTicket
{
    public static void MapDeleteTicketEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapDelete(Endpoints.TicketsWithIdEndpoint, async (AppDbContext db, int id) =>
        {
            Ticket? ticket = await db.Tickets.FirstOrDefaultAsync(ticket => ticket.Id == id);
            if (ticket == null)
            {
                return Results.NotFound();
            }
            
            db.Tickets.Remove(ticket);
            await db.SaveChangesAsync();
            
            return Results.NoContent();
        });
    }
}