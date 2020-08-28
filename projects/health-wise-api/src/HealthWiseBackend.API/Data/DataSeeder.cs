using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data
{
  public class DataSeeder
  {
    public static async Task Seed(HealthWiseDbContext healthWiseDbContext, IContextData contextData, IDateTimeManager datetimeManager)
    {
      if (!healthWiseDbContext.BloodPressureReadings.Any())
      {
        var personId = "auth0|5f38c32e2f9cdc006774a4dd";

        var bp1 = new BloodPressureReading(119, 82, 80);
        bp1.DateTaken = datetimeManager.Today;
        bp1.PersonId = personId;

        var bp2 = new BloodPressureReading(113, 78, 75);
        bp2.DateTaken = datetimeManager.Today.AddDays(1);
        bp2.PersonId = personId;

        var bp3 = new BloodPressureReading(115, 79, 82);
        bp3.DateTaken = datetimeManager.Today.AddDays(-1);
        bp3.PersonId = personId;

        await healthWiseDbContext.BloodPressureReadings.AddRangeAsync(new[] { bp1, bp2, bp3 });

        await healthWiseDbContext.SaveChangesAsync();
      }
    }
  }
}
