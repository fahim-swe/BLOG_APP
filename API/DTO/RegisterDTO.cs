using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string UserName {get; set;}
        
        [Required]
        public string Password {get; set;}

         [Required]
        public DateTime DateOfBirth {get; set;}

         [Required]
        public string Email {get; set;}

         [Required]
        public string Phone {get; set;}
    }
}