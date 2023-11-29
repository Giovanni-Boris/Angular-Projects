using Microsoft.AspNetCore.Identity;

namespace Ecommerce.models
{
    public class User : IdentityUser
    {

        public string Img { get; set; }
        public int Status { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
    }
}
