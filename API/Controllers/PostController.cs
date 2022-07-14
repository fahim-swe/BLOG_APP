using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;
using API.Helper;
using API.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]

    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IAccountService _accountService;

        public PostController(IPostService postService, IAccountService accountService)
        {
            _postService = postService;
            _accountService = accountService;
        }


        
        [HttpGet]
        public async Task<List<Post>> GetPost()
        {
            return await _postService.GetPosts();
        }

        [HttpGet("{username}")]
        public async Task<List<Post>> GetUserPost(string username)
        {   
            return await _postService.GetUserPost(username);
        }

        [HttpPost]
        public async Task<IActionResult> CreateNewPost(PostDTO postDTO)
        {
            if(!ModelState.IsValid) return BadRequest("NOT VALID");

            var loggedUsername = User.GetLoggedInUserName();
            var loggedUserId = User.GetLoggedInUserId();
            
            
            var post = new Post
            {
                Content = postDTO.Content,
                AuthorId = new Guid(loggedUserId),
                UserName = loggedUsername
            };

            await _postService.NewPostAsync(post);
            
            return Ok(post);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            await _postService.DeletePostAsync(id);
            return Ok("Deleted");
        }
        
    }
}