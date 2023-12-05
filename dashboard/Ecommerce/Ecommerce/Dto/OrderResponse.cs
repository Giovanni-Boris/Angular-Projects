namespace Ecommerce.Dto
{
    public class OrderResponse
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Img { get; set; }
        public string Customer { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Method { get; set; }
        public string Status { get; set; }
    }
}
