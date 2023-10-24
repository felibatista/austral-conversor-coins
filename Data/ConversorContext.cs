using conversor_coin.Controller;
using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace conversor_coin.Data;

public class ConversorContext : DbContext
{
 
    public DbSet<User> Users { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<Foreing> Foreings { get; set; }
    public DbSet<ForeingCoversion> ForeingCoversion { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=final_conversor.sqlite");
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                UserName = "Admin",
                FirstName = "Admin",
                LastName = "Admin",
                Email = "admin@admin.com",
                Coins = 1000,
                Password = "admin",
                Conversions = new List<ForeingCoversion>(),
                SubscriptionId = 0,
            });
        
        modelBuilder.Entity<Foreing>().HasData(
            new Foreing
            {
                Id = 1,
                Name = "Dolar",
                Code = "USD",
                Value = 1,
                ImageUrl = ""
            }, new Foreing
            {
                Id = 2,
                Name = "Euro",
                Code = "EUR",
                Value = 1.2,
                ImageUrl = ""
                
            },
            new Foreing
            {
                Id = 3,
                Name = "Real",
                Code = "BRL",
                Value = 0.2,
                ImageUrl = ""
            });

        modelBuilder.Entity<Subscription>().HasData(
            new Subscription
            {
                Id = 1,
                Name = "Free",
                Price = 0,
                Limit = 10
            }, new Subscription
            {
                Id = 2,
                Name = "Trial",
                Price = 10,
                Limit = 100
            },
            new Subscription
            {
                Id = 3,
                Name = "Premium",
                Price = 20,
                Limit = -1
            });
    }
    
}