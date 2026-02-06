namespace GGAppBackend.Models
{
    public class LowStockItemReqDto
    {
        public int id {get; set;}
        public string itemName {get; set;} = string.Empty;
        public string category {get; set;} = string.Empty;
        public int quantityLeft {get; set;}
        public int reorderLevel {get; set;}
        public string status {get; set;} = string.Empty;
    } 
}