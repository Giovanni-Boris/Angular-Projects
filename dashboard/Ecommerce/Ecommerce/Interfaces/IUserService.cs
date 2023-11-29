using Ecommerce.Dto;
using Microsoft.AspNetCore.Identity;

namespace Ecommerce.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse> UpdateUser(string userId, UserRequest newUser);
        Task<UserResponse> getUser(string userId);
    }
}
