using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class User
    {
        [Key]
        public Guid Id {get; set;}
        public string UserName {get; set;}

        public byte[] PasswordHash {get; set;}
        public byte[] PasswordSalt {get; set;}
        public DateTime DateOfBirth {get; set;}
        public string Email {get; set;}

        public string Phone {get; set;}

        public ICollection<Post> Posts {get; set;}

    }
}