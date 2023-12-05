using Ecommerce.Dto;
using Ecommerce.Exeptions;
using Ecommerce.Identity;
using Ecommerce.Interfaces;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }
        [HttpPost("{productId}/{userId}/create-order")]
        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        [ModelValidationAttribute]
        public async Task<IActionResult> CreateOrderForProduct(int productId,string userId, OrderRequest order)
        {
            
            return await _orderService.CreateOrderForProductAndUser(productId, userId, order);
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetOrdersAsync();
            return Ok(orders);
        }
        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetOrdersForProduct(int productId)
        {

            var orders = await _orderService.GetOrdersForProductAsync(productId);
            return Ok(orders);

        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersForUser(string userId)
        {

            var orders = await _orderService.GetOrdersForUserAsync(userId);
            return Ok(orders);

        }
    }
}
