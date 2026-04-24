using System.ComponentModel.DataAnnotations;

namespace TaskFlow.Api.Models;

public class Ticket
{
    public int Id { get; set;}
    [MaxLength(100)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(20)]
    public string Priority { get; set; } = string.Empty;
    [MaxLength(20)]
    public string Status { get; set; } = string.Empty;
}
