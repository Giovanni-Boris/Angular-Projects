using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dto
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Img { get; set; } 
        public int Status { get; set; }

        public int Age { get; set; }
        public string Email { get; set; }
    }
}
