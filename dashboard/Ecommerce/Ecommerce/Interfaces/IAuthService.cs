﻿using Ecommerce.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Interfaces
{
    public interface IAuthService
    {
        Task< string> Register(RegistrationRequest model, string role);
        Task<LoginResponse> Login(LoginRequest model);
    }
}
