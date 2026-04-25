namespace TaskFlow.Api.Endpoints;

public static class Endpoints
{
    // Tickets
    public const string TicketsGeneralEndpoint = "/api/tickets";
    public const string TicketsWithIdEndpoint = "/api/tickets/{id}";
    public const string TicketsMoveEndpoint = "/api/tickets/{id}/move";
    
    // Auth
    public const string AuthRegisterEndpoint = "/api/auth/register";
    public const string AuthLoginEndpoint = "/api/auth/login";
}