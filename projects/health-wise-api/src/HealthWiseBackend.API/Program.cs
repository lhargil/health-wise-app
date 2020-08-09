using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace HealthWiseBackend.API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
          var host = CreateHostBuilder(args).Build();

          using (var scope = host.Services.CreateScope())
          {
            try
            {
              var services = scope.ServiceProvider;
              var healthWiseDbContext = services.GetRequiredService<HealthWiseDbContext>();
              var contextData = services.GetRequiredService<IContextData>();
              var datetimeManager = services.GetRequiredService<IDateTimeManager>();

              await healthWiseDbContext.Database.MigrateAsync();

              await DataSeeder.Seed(healthWiseDbContext, contextData, datetimeManager);
            } 
            catch (Exception exception)
            {
              var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
              logger.LogError("An error has occurred while migrating the database.", exception);
            }
          }

          host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
