using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {

        }
        

        public DbSet<User> User {get; set;}
        public DbSet<Post> Post {get; set;}

    }
}