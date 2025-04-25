

namespace BPTracker.Api.Models;

public class AppUser
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty; 
    public string? Email { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }

    public List<BloodPressureEntry> BloodPressureEntries { get; set; } = new List<BloodPressureEntry>();
    
    
    
}