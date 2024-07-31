using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace QPAppBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<YourEntity> YourEntities { get; set; }
    }

    public class YourEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
