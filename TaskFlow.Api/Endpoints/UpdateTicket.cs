using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;
using TaskFlow.Api.Utils;

namespace TaskFlow.Api.Endpoints;

public static class UpdateTicket
{
    public static void MapUpdateTicketEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/tickets/{id}", async (AppDbContext db, int id, UpdateTicketRequest ticket) =>
        {
            if (!TicketUtils.IsValidStatus(ticket.Status))
            {
                return Results.BadRequest();
            }
            
            if (!TicketUtils.IsValidPriority(ticket.Priority))
            {
                return Results.BadRequest();
            }
            
            Ticket? oldTicket = await db.Tickets.FirstOrDefaultAsync(searchTicket => searchTicket.Id == id);
            if (oldTicket == null)
            {
                return Results.NotFound();
            }

            oldTicket.Title = ticket.Title;
            oldTicket.Status = ticket.Status;
            oldTicket.Priority = ticket.Priority;
            await db.SaveChangesAsync();
            
            return Results.Ok();
        });
    }
}