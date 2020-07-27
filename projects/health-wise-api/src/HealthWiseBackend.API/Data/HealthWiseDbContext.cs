using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data.Configurations;
using HealthWiseBackend.API.Entities;
using HealthWiseBackend.API.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data
{
  public class HealthWiseDbContext: DbContext
  {
    private readonly IDateTimeManager _dateTimeManager;
    private readonly IContextData _contextData;

    public HealthWiseDbContext(DbContextOptions<HealthWiseDbContext> options,
      IDateTimeManager dateTimeManager,
      IContextData contextData
    ):base(options)
    {
      _dateTimeManager = dateTimeManager;
      _contextData = contextData;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfiguration(new PersonConfiguration());
      modelBuilder.ApplyConfiguration(new BloodPressureReadingConfiguration());

      base.OnModelCreating(modelBuilder);
    }

    public DbSet<Person> People { get; set; }
    public DbSet<BloodPressureReading> BloodPressureReadings { get; set; }

    public override int SaveChanges()
    {
      var saveTask = Task.Run(async () =>
      {
        return await this.SaveChangesAsync();
      });
      return saveTask.Result;
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
      foreach (var entry in ChangeTracker.Entries()
                  .Where(e => e.State == EntityState.Added ||
                  e.State == EntityState.Modified ||
                  e.State == EntityState.Deleted))
      {
        var today = _dateTimeManager.Today;
        var currentUser = _contextData.CurrentUser ?? null;

        if (entry.Metadata.FindProperty("DateUpdated") == null)
        {
          continue;
        }

        entry.Property("DateUpdated").CurrentValue = today;
        entry.Property("UpdatedBy").CurrentValue = currentUser?.Id.ToString();
        entry.Property("Status").CurrentValue = Statuses.Updated;

        if (entry.State == EntityState.Added)
        {
          entry.Property("Status").CurrentValue = Statuses.Created;
        }

        if (entry.State == EntityState.Deleted)
        {
          entry.State = EntityState.Modified;
          entry.Property("Status").CurrentValue = Statuses.Archived;
        }
      }
      return base.SaveChangesAsync(cancellationToken);
    }
  }
}
