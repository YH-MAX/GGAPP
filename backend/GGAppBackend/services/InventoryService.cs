using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QPAppBackend.Models;

public class InventoryService : IInventoryService
{
    private readonly List<LowStockAlert> _allProducts;
    private readonly Random _random;
    private readonly int _defaultLowStockThreshold;

    public InventoryService() : this(null, null, 3) { }

    public InventoryService(List<LowStockAlert>? products, Random? random = null, int lowStockThreshold = 3)
    {
        _allProducts = products ?? new List<LowStockAlert>
        {
            new LowStockAlert { ProductId = 1, ProductName = "Widget", Stock = 5 },
            new LowStockAlert { ProductId = 2, ProductName = "Gadget", Stock = 3 },
            new LowStockAlert { ProductId = 3, ProductName = "Thingamajig", Stock = 2 },
            new LowStockAlert { ProductId = 4, ProductName = "Doodad", Stock = 7 },
            new LowStockAlert { ProductId = 5, ProductName = "Doohickey", Stock = 4 }
        };
        _random = random ?? new Random();
        _defaultLowStockThreshold = lowStockThreshold;
    }

    public Task<IEnumerable<LowStockAlert>> GetLowStockAlertsAsync(int? customThreshold = null)
    {
        var threshold = customThreshold ?? _defaultLowStockThreshold;
        
        var alerts = _allProducts.Select(product => new LowStockAlert
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            Stock = _random.Next(0, 8), // Random stock between 0-7
            LowStockThreshold = threshold
        })
        .Where(alert => alert.Stock < alert.LowStockThreshold)
        .ToList();

        return Task.FromResult<IEnumerable<LowStockAlert>>(alerts);
    }
}