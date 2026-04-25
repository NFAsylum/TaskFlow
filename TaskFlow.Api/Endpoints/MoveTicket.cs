using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;
using TaskFlow.Api.Utils;

namespace TaskFlow.Api.Endpoints;

public static class MoveTicket
{
    public static void MapMoveTicketEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPatch(Endpoints.TicketsMoveEndpoint, async (AppDbContext db, int id, MoveRequest request) =>
        {
            if (!TicketUtils.IsValidStatus(request.Status))
            {
                return Results.BadRequest();
            }
            
            Ticket? ticket = await db.Tickets.FirstOrDefaultAsync(ticket => ticket.Id == id);
            if (ticket == null)
            {
                return Results.NotFound();
            }
            
            ticket.Status = request.Status;
            await db.SaveChangesAsync();
            
            return Results.Ok(ticket);
        });
    }
}