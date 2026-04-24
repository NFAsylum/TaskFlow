namespace TaskFlow.Api.Data;

public record UpdateTicketRequest(string Title, string Status, string Priority);