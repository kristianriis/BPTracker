using Microsoft.EntityFrameworkCore;
using BPTracker.Api.Models;

namespace BPTracker.Api.Data;

public class AppDatabaseContext : DbContext
{
    public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) : base(options) { }
        public DbSet<BloodPressureEntry> BloodPressureEntries { get; set; }
        // public DbSet<User> Users { get; set; }
}