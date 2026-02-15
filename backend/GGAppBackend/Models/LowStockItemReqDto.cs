namespace GGAppBackend.Models
{
    public class LowStockItemReqDto
    {
        public int ProductId {get; set;}
        public string ProductName {get; set;} = string.Empty;
        public int StockLevel {get; set;}

        public int LowStockThreshold {get; set;}
    } 
}