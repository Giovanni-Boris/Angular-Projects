using Ecommerce.Dto;
using Ecommerce.Identity;
using Ecommerce.Interfaces;
using Ecommerce.models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [ModelValidationAttribute]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            return  Ok(await _authService.Login(model));   
        }

        [HttpPost]
        [Route("registeration")]
        public async Task<IActionResult> Register(RegistrationRequest model)
        {
            return CreatedAtAction(nameof(Register), await _authService.Registeration(model, model.isAdmin ? UserRoles.Admin : UserRoles.User));
        }

    }

}