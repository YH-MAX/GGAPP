using Microsoft.EntityFrameworkCore;
using GGAppBackend.Models;

namespace GGAppBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Add InventoryItems DbSet for Low Stock Alert feature
        public DbSet<InventoryItem> InventoryItems { get; set; }
    }
}
    