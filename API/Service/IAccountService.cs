using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;

namespace API.Service
{
    public interface IAccountService
    {
        Task<User> AddUserAsync(User user);
        Task<bool> isAnyUserExit(string UserName);

        Task<User> GetByUserName(string username);
    }
}