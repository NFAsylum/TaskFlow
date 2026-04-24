using TaskFlow.Api.Data;
using TaskFlow.Api.Models;

namespace TaskFlow.Api.Utils;

public static class TicketUtils
{
    public static bool IsValidStatus(string status)
    {
        if (status == TicketStatus.Open) return true;
        
        if (status == TicketStatus.InProgress) return true;
        
        if (status == TicketStatus.Review) return true;
        
        if (status == TicketStatus.Done) return true;

        return false;
    }
    
    public static bool IsValidPriority(string priority)
    {
        if (priority == TicketPriority.Low) return true;
        
        if (priority == TicketPriority.Medium) return true;
        
        if (priority == TicketPriority.High) return true;

        return false;
    }

    public static bool IsValidTicket(Ticket ticket)
    {
        if (IsValidStatus(ticket.Status)
            && IsValidPriority(ticket.Priority))
        {
            return true;
        }

        return false;
    }

    public static Ticket CreateTicketFromParams(string title, string priority, string status, int id = 0)
    {
        return new Ticket()
        {
            Id = id,
            Title = title,
            Priority = priority,
            Status = status
        };
    }
}