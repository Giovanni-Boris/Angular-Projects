﻿using Ecommerce.Dto;
using Ecommerce.Exeptions;
using Ecommerce.Interfaces;
using Ecommerce.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Services
{

    public class UserService: IUserService
    {
        private readonly UserManager<User> _userManager;

        public UserService(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
        public async Task<UserResponse> UpdateUser(string userId, UserRequest request)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) throw new NotFoundException("User not found");
            user.UserName = request.Username ?? user.UserName;
            user.PasswordHash = request.Password != null ? _userManager.PasswordHasher.HashPassword(user, request.Password) : user.PasswordHash;
            user.Email = request.Email ?? user.Email;
            user.Img = request.Img ?? user.Img;
            user.Age =  request.Age;
            var userUpdated = await _userManager.UpdateAsync(user);
            if (!userUpdated.Succeeded)
                throw new InvalidDataException("Cannot updated user , try again see your credentials");
            var userUpdate = await _userManager.FindByIdAsync(user.Id);
            return Mapper(userUpdate);
        }

        public async Task<UserResponse> getUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) throw new NotFoundException("User not found");
            return Mapper(user);
        }
        public async Task<IActionResult> removeUser(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return new NotFoundObjectResult($"User with id: {userId} not found");
            await _userManager.DeleteAsync(user);
            return new NoContentResult();
        }   
        public async Task<List<UserResponse>> getAllUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userResponses = new List<UserResponse>();
        
            foreach (var user in users)
            {
                userResponses.Add(Mapper(user));
            }
            return userResponses;
        }
        private UserResponse Mapper(User user)
        {
            return new UserResponse()
            {
                Username = user.UserName,
                Id = user.Id,
                Email = user.Email,
                Img = user.Img,
                Age = user.Age,
                Status = user.Status
            };

        }
    }
}
