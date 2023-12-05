namespace Ecommerce.Dto
{
    public class OrderRequest
    {
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Method { get; set; }
        public string Status { get; set; }
    }
}
