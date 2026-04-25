using System.Security.Cryptography;

namespace TaskFlow.Api.Utils;

public static class SystemUtils
{
    public static string GenerateJwtKey()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }
}