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
                    id = item.Id,
                    itemName = item.ItemName,
                    category = item.Category,
                    quantityLeft = item.Quantity,
                    reorderLevel = item.ReorderLevel,
                    status = item.Quantity <= item.ReorderLevel * 0.5m
                        ? "Critical"
                        : "Warning"
                })
                .OrderBy(x => x.quantityLeft)
                .ToListAsync();
        }
    }
}