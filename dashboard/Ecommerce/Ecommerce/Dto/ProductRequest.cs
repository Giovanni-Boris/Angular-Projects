namespace Ecommerce.Dto
{
    public class ProductRequest
    {
        public string ProductName { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int StockQuantity { get; set; }
        public string Img { get; set; }

    }
}
