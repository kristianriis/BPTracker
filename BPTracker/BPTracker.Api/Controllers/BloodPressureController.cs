using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using BPTracker.Api.Data;
using BPTracker.Api.Models;
using Microsoft.AspNetCore.Authorization;

namespace BPTracker.Api.Controllers
{
    [Authorize]
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
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);

            var entries = _context.BloodPressureEntries
                .Where(e => e.UserId == userId)
                .OrderByDescending(e => e.Time)
                .ToList();
            return Ok(entries);
        }
        
        [HttpGet("whoami")]
        [Authorize]
        public IActionResult WhoAmI()
        {
            var nameId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            var username = User.FindFirst(System.Security.Claims.ClaimTypes.Name)?.Value;

            return Ok(new
            {
                NameIdentifier = nameId,
                Name = username,
                IsAuthenticated = User.Identity?.IsAuthenticated
            });
        }

        [HttpPost]
        public IActionResult Post([FromBody] BloodPressureEntry entry)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();

            int userId = int.Parse(userIdClaim.Value);
            entry.UserId = userId;
            entry.Time = DateTime.UtcNow;

            _context.BloodPressureEntries.Add(entry);
            _context.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = entry.Id }, entry);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if(userIdClaim == null)
                return Unauthorized();
            
            int userId = int.Parse(userIdClaim.Value);
            var entry = _context.BloodPressureEntries.FirstOrDefault(e => e.Id  == id && e.UserId == userId);
            if(entry == null)
                return NotFound();
            
            _context.BloodPressureEntries.Remove(entry);
            _context.SaveChanges();
            
            return NoContent();
        }
    }
}