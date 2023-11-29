
using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dto
{
    public class UserRequest
    {
        public string? Username { get; set; }
        public string? Img { get; set; }
        public int? Status { get; set; }

        public int Age { get; set; }
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
