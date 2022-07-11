using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entity
{
    public class Post
    {
        [Key]
        public Guid PostId {get; set;}

        public DateTime PublishDate {get; set;} = DateTime.Now;

        public string Content {get; set;}

        public string UserName {get; set;}
      

        [ForeignKey("AuthorId")]
        public Guid AuthorId {get; set;}
    }
}