using Ecommerce.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse> UpdateUser(string userId, UserRequest newUser);
        Task<UserResponse> getUser(string userId);
        Task<List<UserResponse>> getAllUsers();
        Task<IActionResult> removeUser(string userId);

    }
}
