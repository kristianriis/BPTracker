using Microsoft.AspNetCore.Mvc;
using BPTracker.Api.Data;
using BPTracker.Api.Models;

namespace BPTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BloodPressureController : ControllerBase
    {
        private readonly AppDatabaseContext _context;

        public BloodPressureController(AppDatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var entries = _context.BloodPressureEntries
                .OrderByDescending(e => e.Time)
                .ToList();
            return Ok(entries);
        }

        [HttpPost]
        public IActionResult Post([FromBody] BloodPressureEntry entry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            entry.Time = DateTime.UtcNow;
            _context.BloodPressureEntries.Add(entry);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = entry.Id }, entry);
        }
    }
}