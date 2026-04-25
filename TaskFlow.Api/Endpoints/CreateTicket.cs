using Microsoft.EntityFrameworkCore;
using TaskFlow.Api.Data;
using TaskFlow.Api.Models;
using TaskFlow.Api.Utils;

namespace TaskFlow.Api.Endpoints;

public static class CreateTicket
{
    public static void MapCreateTicketEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost(Endpoints.TicketsGeneralEndpoint, async (AppDbContext db, AddTicketRequest ticketRequest) =>
        {
            if (!TicketUtils.IsValidStatus(ticketRequest.Status))
            {
                return Results.BadRequest();
            }
            
            if (!TicketUtils.IsValidPriority(ticketRequest.Priority))
            {
                return Results.BadRequest();
            }
            
            Ticket newTicket = TicketUtils.CreateTicketFromParams(
                title: ticketRequest.Title,
                priority: ticketRequest.Priority,
                status: ticketRequest.Status
                );
            
            db.Tickets.Add(newTicket);
            await db.SaveChangesAsync();
            
            return Results.Created($"/api/tickets/{newTicket.Id}", newTicket);
        }).RequireAuthorization();
    }
}