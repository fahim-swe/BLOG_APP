using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Service
{
    public class Service : IAccountService, IPostService
    {
        private readonly DataContext _context;
        public Service(DataContext context)
        {
            _context = context;
        }
        public async Task<User> AddUserAsync(User user)
        {
            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task DeletePostAsync(Guid id)
        {
            var singleRec = await _context.Post.FirstOrDefaultAsync(x => x.PostId == id);
            if(singleRec != null){
                _context.Post.Remove(singleRec);
                await _context.SaveChangesAsync();
            }
        }


        public async Task<User> GetByUserName(string username)
        {
            return await _context.User.FirstAsync(x => x.UserName == username);
        }

        public async Task<List<Post>> GetPosts() {
            return await _context.Post
                    .OrderByDescending(x => x.PublishDate)
                    .ToListAsync();  
        } 

        public async Task<List<Post>> GetUserPost(string UserName)
        {
           return await _context.Post.Where(x => x.UserName == UserName)
           .OrderByDescending(x => x.PublishDate)
           .ToListAsync();
        }

        public async Task<bool> isAnyUserExit(string UserName)
        {
            return await _context.User.AnyAsync(x => x.UserName == UserName);
        }

        public async Task NewPostAsync(Post post)
        {
            await _context.Post.AddAsync(post);
            await _context.SaveChangesAsync();
        }

    }
}