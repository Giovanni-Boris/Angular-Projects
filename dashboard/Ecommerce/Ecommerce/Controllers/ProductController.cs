using Ecommerce.Dto;
using Ecommerce.Identity;
using Ecommerce.Interfaces;
using Ecommerce.models;
using Ecommerce.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ecommerce.Controllers
{

    [Route("api/products")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        [ModelValidationAttribute]
        [Authorize(Policy = IdentityData.AdminUserPolicyName)]
        public async Task<IActionResult> CreateProduct([FromBody] ProductRequest product)
        {
            var createdProduct = await _productService.CreateProduct(product);

            // Return a 201 Created response with the created product
            return CreatedAtAction(nameof(CreateProduct), createdProduct);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
           
            return  Ok(await _productService.GetAllProductsAsync());
          
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            return await _productService.GetProductByIdAsync(id);
        }
    }
}
