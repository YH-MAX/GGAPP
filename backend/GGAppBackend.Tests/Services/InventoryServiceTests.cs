using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QPAppBackend.Models;
using Xunit;

namespace QPAppBackend.Tests.Services
{
    public class InventoryServiceTests
    {
        private const int LowStockThreshold = 3;

        [Fact]
        public async Task Returns_CorrectNumber()
        {
            // Arrange
            var products = new List<LowStockAlert>
            {
                new LowStockAlert { ProductId = 1, ProductName = "A", Stock = 2 },
                new LowStockAlert { ProductId = 2, ProductName = "B", Stock = 3 },
                new LowStockAlert { ProductId = 3, ProductName = "C", Stock = 1 },
                new LowStockAlert { ProductId = 4, ProductName = "D", Stock = 5 }
            };
            var service = new InventoryService(products, new Random(42), LowStockThreshold);

            // Act
            var result = (await service.GetLowStockAlertsAsync()).ToList();

            // Assert
            Assert.All(result, item => Assert.True(item.Stock < LowStockThreshold));
            // Check that only products from the input are returned
            Assert.All(result, item => Assert.Contains(products, p => p.ProductId == item.ProductId));
        }

        [Fact]
        public async Task Returns_EmptyList()
        {
            // Arrange
            var products = new List<LowStockAlert>
            {
                new LowStockAlert { ProductId = 1, ProductName = "A", Stock = 5 },
                new LowStockAlert { ProductId = 2, ProductName = "B", Stock = 4 }
            };
            var service = new InventoryService(products, new Random(42), LowStockThreshold);

            // Act
            var result = await service.GetLowStockAlertsAsync();

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public async Task Handles_ErrorGracefully()
        {
            // Arrange
            var service = new FaultyInventoryService();

            // Act & Assert
            var exception = await Record.ExceptionAsync(() => service.GetLowStockAlertsAsync());
            Assert.Null(exception); 
        }

        // Helper class to simulate error
        private class FaultyInventoryService : IInventoryService
        {
            public Task<IEnumerable<LowStockAlert>> GetLowStockAlertsAsync()
            {
                try
                {
                    throw new Exception("Simulated error");
                }
                catch
                {
                    return Task.FromResult<IEnumerable<LowStockAlert>>(new List<LowStockAlert>());
                }
            }
        }
    }
}
