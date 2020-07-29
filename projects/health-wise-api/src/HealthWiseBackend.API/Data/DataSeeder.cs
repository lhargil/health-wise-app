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
    public static async Task Seed(HealthWiseDbContext healthWiseDbContext, IContextData contextData)
    {
      if (!healthWiseDbContext.People.Any())
      {
        var person1 = new Person("lhar", "gil");
        var person2 = new Person("jon", "snow");

        healthWiseDbContext.People.Add(person1);
        healthWiseDbContext.People.Add(person2);

        contextData.CurrentUser = person1;

        person1.AddBloodPressureReading(new BloodPressureReading(119, 82, 80));
        person1.AddBloodPressureReading(new BloodPressureReading(113, 78, 75));

        var bloodPressureReading = new BloodPressureReading(115, 79, 82);
        person1.AddBloodPressureReading(bloodPressureReading);

        await healthWiseDbContext.SaveChangesAsync();

        person1.RemoveBloodPressureReading(bloodPressureReading);

        await healthWiseDbContext.SaveChangesAsync();
      }
    }
  }
}
