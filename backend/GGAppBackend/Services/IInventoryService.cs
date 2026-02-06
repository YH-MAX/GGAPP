// here is to create the interface 
using GGAppBackend.Models;

namespace GGAppBackend.Services
{
    public interface IInventoryService
    {
        Task<IEnumerable<LowStockItemReqDto>> GetLowStockItemsAsync();
    }
}
