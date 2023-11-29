using Ecommerce.Dto;
using Ecommerce.Identity;
using Ecommerce.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        /*[HttpGet]
        public async Task<IActionResult> getUser()
        {
           
        }*/

        [HttpPut("updateUser/{userId}")]
        [ModelValidationAttribute]
        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        public async Task<IActionResult> UpdateUser([FromRoute] string userId, [FromBody] UserRequest model)
        {
            if (_userService == null) ;
            return Ok(await  _userService.UpdateUser(userId, model));
  
          
        }
    }
}
