using Microsoft.AspNetCore.Mvc; 
using QPAppBackend.Models;

namespace QPAppBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        [HttpGet("low-stock-alerts")]
        public async Task<IActionResult> GetLowStockAlerts([FromQuery] int? threshold = null)
        {
            var alerts = await _inventoryService.GetLowStockAlertsAsync(threshold);
            return Ok(alerts);
        }
    }
}