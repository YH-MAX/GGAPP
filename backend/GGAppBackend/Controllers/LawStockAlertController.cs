using System.Linq.Expressions;
using System.Runtime.Versioning;
using System.Security;
using Microsoft.AspNetCore.Mvc;
using GGAppBackend.Services;
namespace GGAppBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LowStockAlertController : ControllerBase
    {
        #region Variable Declaration
        private readonly IInventoryService _lowStockAlertService;
        #endregion

        #region Constructor
        public LowStockAlertController(IInventoryService lowStockAlertService)
        {
            _lowStockAlertService = lowStockAlertService;
        }
        #endregion

        #region Methods
        [HttpGet("lowstock")]
        public async Task<IActionResult> GetLowStockItems()
        {
            try
            {
                var items = await _lowStockAlertService.GetLowStockItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Failed to retrieve low stock items.",
                    error = ex.Message
                });
            }
        }
        #endregion
    }
}
    
