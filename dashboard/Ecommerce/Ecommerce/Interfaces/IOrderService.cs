using Ecommerce.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Interfaces
{
    public interface IOrderService
    {
        Task<IActionResult> CreateOrderForProductAndUser(int productId, string userId, OrderRequest orderRequest);
        Task<List<OrderResponse>> GetOrdersAsync();
        Task<List<OrderResponse>> GetOrdersForProductAsync(int productId);
        Task<List<OrderResponse>> GetOrdersForUserAsync(string userId);
    }
}
