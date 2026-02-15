using Microsoft.EntityFrameworkCore;
using GGAppBackend.Data;
using GGAppBackend.Models;
namespace GGAppBackend.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly AppDbContext _context;

        public InventoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<LowStockItemReqDto>> GetLowStockItemsAsync()
        {
            return await _context.InventoryItems
                .AsNoTracking()
                .Where(item => item.Quantity <= item.ReorderLevel)
                .Select(item => new LowStockItemReqDto
                {
                    ProductId = item.Id,
                    ProductName = item.ItemName,
                    StockLevel = item.Quantity,
                    LowStockThreshold = item.ReorderLevel
                    
                })
                .Where(item => item.StockLevel <= item.LowStockThreshold)
                .ToListAsync();
        }
    }
}