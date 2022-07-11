using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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
     
    public class AccountController: ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ITokenService _tokenService;
        public AccountController(IAccountService accountService, 
            ITokenService tokenService
        )
        {
            _accountService = accountService;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(RegisterDTO register)
        {
            if(!ModelState.IsValid) return BadRequest("NOT VALID");

        
            if(await _accountService.isAnyUserExit(register.UserName)) return BadRequest("User-name already exit");
            
            var user = new User 
            {
                UserName = register.UserName,
                DateOfBirth = register.DateOfBirth,
                Email = register.Email,
                Phone = register.Phone
            };

            using var hmac = new HMACSHA512();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password));
            user.PasswordSalt  = hmac.Key;


            await _accountService.AddUserAsync(user);
            var userDto = new UserDTO
            {
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user),
            };

            
            return Ok(userDto);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDTO login)
        {
            if(!ModelState.IsValid) return BadRequest("NOT VALID");

            var user = await _accountService.GetByUserName(login.UserName);
            if(user == null) return Unauthorized("USER NAME NOT FOUND");
            
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for(int i = 0; i < computedHash.Length; i++){
                if(computedHash[i] != user.PasswordHash[i]){
                    return Unauthorized(("PASSWORD WRONG"));
                }
            }

            var userDto = new UserDTO{
                UserName =user.UserName,
                Token = _tokenService.CreateToken(user),
            };

            return Ok(userDto);
        }

        [HttpGet("{username}")]
        public async Task<IActionResult> GetUser(string username)
        {
            return Ok(await _accountService.GetByUserName(username));
        }
    }
}