using Ecommerce.data;
using Ecommerce.Dto;
using Ecommerce.Interfaces;
using Ecommerce.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce.Services
{
    public class ProductService: IProductService
    {
        private readonly DataContext _dataContext;

        public ProductService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<string> CreateProduct(ProductRequest productDTO)
        {
            Product product = new Product
            {
                ProductName = productDTO.ProductName,
                Description = productDTO.Description,
                Price = productDTO.Price,
                StockQuantity = productDTO.StockQuantity,
                UpdatedAt = DateTime.UtcNow,
                Img = productDTO.Img
            };

            _dataContext.Products.Add(product);
           
            await _dataContext.SaveChangesAsync();

            return "Product created successfully!"; 
        }
        public async Task<List<ProductResponse>> GetAllProductsAsync()
        {
            var products = await _dataContext.Products
                .Select(p => Mapper(p))
                .ToListAsync();

            return products;
        }
        public async Task<IActionResult> GetProductByIdAsync(int productId)
        {
            var product = await _dataContext.Products
                .Where(p => p.Id == productId)
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return new NotFoundObjectResult($"Product with id: {productId} not found");
            }

            return new OkObjectResult(Mapper(product)) ;

        }
        private static ProductResponse Mapper(Product product)
        {
            return new ProductResponse
            {
                Id = product.Id,
                ProductName = product.ProductName,
                Description = product.Description,
                Img = product.Img,
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                CreatedAt = product.CreatedAt,
                UpdatedAt = product.UpdatedAt
            };
        }

    }
}
