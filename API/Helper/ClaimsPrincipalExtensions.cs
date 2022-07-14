using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Helper
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetLoggedInUserName(this ClaimsPrincipal principal)
        {
            if(principal == null)
                throw new ArgumentNullException(nameof(principal));
            return principal.FindFirstValue(ClaimTypes.Name);
        }
        
        public static string GetLoggedInUserId(this ClaimsPrincipal principal)
        {
            if(principal == null)
                throw new ArgumentNullException(nameof(principal));
            var res =  principal.Claims.Where(x => x.Type == "Id").FirstOrDefault();
            return res.Value; 
        }
    }
}