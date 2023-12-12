namespace Ecommerce.Dto
{
    public class OrderRequest
    {
        public double Amount { get; set; }
        public string Method { get; set; }
        public string Status { get; set; }
    }
}
