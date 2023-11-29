using System.ComponentModel.DataAnnotations;

namespace Ecommerce.Dto
{
    public class RegistrationRequest
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }
        public string Img { get; set; }
        public int Status { get; set; }

        public int Age { get; set; }

        public bool isAdmin { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }
}
