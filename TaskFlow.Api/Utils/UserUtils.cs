using TaskFlow.Api.Models;

namespace TaskFlow.Api.Utils;

public static class UserUtils
{
    public static bool IsValidName(string name)
    {
        if (name.Contains(' '))
        {
            return false;
        }
        
        return true;
    }
    
    public static bool IsValidEmail(string email)
    {
        if (email.Contains(' ') || !email.Contains('@'))
        {
            return false;
        }
        
        return true;
    }

    public static User CreateUserFromParams(string name, string email, string password)
    {
        return new User()
        {
            Name = name,
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password)
        };
    }

    public static bool IsValidPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }
}