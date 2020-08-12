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
      if (!healthWiseDbContext.People.Any())
      {
        var person1 = new Person("lhar", "gil");
        var person2 = new Person("jon", "snow");

        healthWiseDbContext.People.Add(person1);
        healthWiseDbContext.People.Add(person2);

        contextData.CurrentUser = person1;

        var bp1 = new BloodPressureReading(119, 82, 80);
        bp1.DateTaken = datetimeManager.Today;

        var bp2 = new BloodPressureReading(113, 78, 75);
        bp2.DateTaken = datetimeManager.Today.AddDays(1);

        var bp3 = new BloodPressureReading(115, 79, 82);
        bp3.DateTaken = datetimeManager.Today.AddDays(-1);

        person1.AddBloodPressureReading(bp1);
        person1.AddBloodPressureReading(bp2);
        person1.AddBloodPressureReading(bp3);

        await healthWiseDbContext.SaveChangesAsync();
      }
    }
  }
}
