using System.ComponentModel.DataAnnotations;

namespace BPTracker.Api.Models;

public class RegisterRequest
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}