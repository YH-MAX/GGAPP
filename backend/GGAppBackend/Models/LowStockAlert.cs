namespace QPAppBackend.Models
{
    public class LowStockAlert
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty; 
        public int Stock { get; set; }
        public int LowStockThreshold { get; set; }
    }
}