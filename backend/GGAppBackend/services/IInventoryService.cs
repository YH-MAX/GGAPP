using System.Collections.Generic;
using System.Threading.Tasks;
using QPAppBackend.Models;

public interface IInventoryService
{
    Task<IEnumerable<LowStockAlert>> GetLowStockAlertsAsync(int? customThreshold = null);
}