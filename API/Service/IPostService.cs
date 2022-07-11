using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;

namespace API.Service
{
    public interface IPostService
    {
        Task NewPostAsync(Post post);
        
        
        Task<List<Post>> GetPosts();

        Task<List<Post>> GetUserPost(string UserName);

        Task DeletePostAsync(Guid id);

    }
}