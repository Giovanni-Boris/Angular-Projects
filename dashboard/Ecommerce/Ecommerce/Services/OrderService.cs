using Ecommerce.data;
using Ecommerce.Dto;
using Ecommerce.Exeptions;
using Ecommerce.Interfaces;
using Ecommerce.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.Security.Claims;
using System.Web.Http.Results;

namespace Ecommerce.Services
{
    public class OrderService : IOrderService
    {
        private readonly DataContext _dataContext;
        private readonly UserManager<User> _userManager;

        public OrderService(DataContext dataContext, UserManager<User> userManager)
        {
            _dataContext = dataContext;
            _userManager = userManager;
        }
        public async Task<IActionResult> CreateOrderForProductAndUser(int productId,string userId, OrderRequest orderRequest)
        {
            // Find the product by ID
            var product = await _dataContext.Products
                .Where(p => p.Id == productId)
                .FirstOrDefaultAsync();
            if (product == null)
                return new NotFoundObjectResult($"Product with id: {productId} not found");

            // Get the currently authenticated user
            var currentUser = await _userManager.FindByIdAsync(userId);

            if (currentUser == null)
                return new NotFoundObjectResult($"User with id: {userId} not found");

            var order = new Order
            {
                Date = DateTime.UtcNow,
                Amount = orderRequest.Amount,
                Method = orderRequest.Method,
                ProductId = productId,
                UserId = currentUser.Id,
                Status = orderRequest.Status,
            };

            product.Orders.Add(order);

            currentUser.Orders.Add(order);

            _dataContext.Orders.Add(order);
            await _dataContext.SaveChangesAsync();

            return new  OkObjectResult("Order created successfully!");
        }
        public async Task<List<OrderResponse>> GetOrdersAsync()
        {
            var orders = await _dataContext.Orders
                .Include(o => o.Product)
                .Include(o => o.User)
                .Select(o => new OrderResponse
                {
                    Id = o.Id,
                    ProductName = o.Product.ProductName,
                    Img = o.Product.Img, 
                    Customer = o.User.UserName,
                    Date = o.Date,
                    Amount = o.Amount,
                    Method = o.Method,
                    Status = o.Status
                })
                .ToListAsync();

            return orders;
        }
        public async Task<List<OrderResponse>> GetOrdersForProductAsync(int productId)
        {
            var orders = await _dataContext.Orders
                .Where(o => o.ProductId == productId)
                .Include(o => o.Product)
                .Include(o => o.User)
                .Select(o => new OrderResponse
                {
                    Id = o.Id,
                    ProductName = o.Product.ProductName,
                    Img = o.Product.Img,
                    Customer = o.User.UserName,
                    Date = o.Date,
                    Amount = o.Amount,
                    Method = o.Method,
                    Status = o.Status
                })
                .ToListAsync();

            return orders;
        }
        public async Task<List<OrderResponse>> GetOrdersForUserAsync(string userId)
        {
            var orders = await _dataContext.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.Product)
                .Include(o => o.User)
                .Select(o => new OrderResponse
                {
                    Id = o.Id,
                    ProductName = o.Product.ProductName,
                    Img = o.Product.Img,
                    Customer = o.User.UserName,
                    Date = o.Date,
                    Amount = o.Amount,
                    Method = o.Method,
                    Status = o.Status
                })
                .ToListAsync();

            return orders;
        }
    }
}
