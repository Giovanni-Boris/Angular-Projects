using Ecommerce.Dto;
using Ecommerce.models;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Interfaces
{
    public interface IProductService
    {
        Task<string> CreateProduct(ProductRequest product);
        Task<List<ProductResponse>> GetAllProductsAsync();
        Task<IActionResult> GetProductByIdAsync(int productId);
    }
}
