using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;

namespace API.Service
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}