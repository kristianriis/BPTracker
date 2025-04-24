

namespace BPTracker.Api.Models;

public class User
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty; 
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public List<BloodPressureEntry> BloodPressureEntries { get; set; } = new List<BloodPressureEntry>();
    
    
    
}