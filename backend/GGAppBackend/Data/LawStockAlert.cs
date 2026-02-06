using system.collections.generic;
using System;
using Microsoft.EntityFrameworkCore;
using GGAppBackend.Models;
using System.Data.Common; 

namespace GGAppBackend.Data
{
    public class LowStockAlertContext : DbContext
    {
        public LowStockAlertContext (DbContextOptions<LowStockAlertContext> options)
            : base(options){}

        
        public DbSet<InvetoryItemReqDto> InventoryItems {get; set;}
    }
}