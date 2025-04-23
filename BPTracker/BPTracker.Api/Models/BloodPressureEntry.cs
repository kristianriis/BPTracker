using System.ComponentModel.DataAnnotations;

namespace BPTracker.Api.Models;

public class BloodPressureEntry
{
    
    public int Id { get; set; }
    
    [Required]
    [Range(50,250)]
    public int Systolic { get; set; }
    [Required]
    [Range(30,150)]
    public int Diastolic { get; set; }
    [Required]
    [Range(30,200)]
    public int Pulse { get; set; }
    [Required]
    public DateTime Time { get; set; } = DateTime.Now;
    
    public string? UserId { get; set; }
}