using conversor_coin.Controller;
using Microsoft.EntityFrameworkCore;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;

namespace conversor_coin.Data;

public class ConversorContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Subscription> Subscriptions { get; set; }
    public DbSet<Currency> Currency { get; set; }
    public DbSet<CurrencyConversion> CurrencyConversion { get; set; }
    public DbSet<Auth> Auth { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=final_conversor.sqlite");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Subscription>()
            .HasMany(e => e.Users)
            .WithOne(e => e.Subscription)
            .HasForeignKey("SubscriptionId")
            .IsRequired();

        modelBuilder.Entity<Auth>()
            .HasOne(e => e.User)
            .WithOne(e => e.Auth)
            .HasForeignKey<User>(e => e.AuthId);

        modelBuilder.Entity<Currency>().HasData(
            new Currency
            {
                Id = 1,
                Name = "Dolar estadounidense",
                Code = "USD",
                Value = 1,
                ImageUrl = "https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/us.svg"
            }, new Currency
            {
                Id = 2,
                Name = "Euro",
                Code = "EUR",
                Value = 1.2,
                ImageUrl = "https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/eu.svg"
            },
            new Currency
            {
                Id = 3,
                Name = "Real",
                Code = "BRL",
                Value = 0.2,
                ImageUrl = "https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/br.svg"
            },
            new Currency
            {
                Id = 4,
                Name = "Peso argentino",
                Code = "ARS",
                Value = 0.33,
                ImageUrl = "https://cdn.jsdelivr.net/gh/lipis/flag-icon-css@master/flags/4x3/ar.svg"
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

        modelBuilder.Entity<Auth>().HasData(
            new Auth
            {
                Id = 1,
                Password = "admin",
                Role = "admin",
            });

        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                UserName = "Admin",
                FirstName = "Admin",
                LastName = "Admin",
                Email = "admin@admin.com",
                AuthId = 1,
                SubscriptionId = 1
            });


        /*for (int a = 2; a < 50; a++)
        {
            modelBuilder.Entity<Auth>().HasData(
                new Auth
                {
                    Id = a,
                    Password = "admin",
                    Role = "admin",
                });
            
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = a,
                    UserName = "Admin"+a,
                    FirstName = "Admin",
                    LastName = "Admin",
                    Email = "admin@admin.com"+a,
                    AuthId = a,
                    SubscriptionId = a 
                });
        }*/





        /*for (int a = 2; a < 50; a++)
        {
            modelBuilder.Entity<CurrencyConversion>().HasData(
                new CurrencyConversion
                {
                    Id = a,
                    Amount = 10,
                    Date = DateTime.Now
                });
        }*/
    }
}