using Microsoft.AspNetCore.Mvc;
using BPTracker.Api.Services;
using BPTracker.Api.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BPTracker.Api.Models;

namespace BPTracker.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDatabaseContext _context;
    private readonly AuthService _authService;

    public AuthController(AppDatabaseContext context, AuthService authService)
    {
        _context = context;
        _authService = authService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
        if (_context.Users.Any(u => u.Username == request.Username))
            return BadRequest("Username is already taken");

        _authService.CreatePasswordHash(request.Password, out var hash, out var salt);

        var user = new AppUser()
        {
            Username = request.Username,
            PasswordHash = hash,
            PasswordSalt = salt
        };

        _context.Users.Add(user);
        _context.SaveChanges();
        return Ok("User registered successfully");
    }
    
    

    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == request.Username);
        if (user == null)
            return Unauthorized("Invalid username or password");

        if (!_authService.VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
            return Unauthorized("Invalid username or password");

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    private string GenerateJwtToken(AppUser user)
    {
        var secret = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#"; // Same as in Program.cs
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}