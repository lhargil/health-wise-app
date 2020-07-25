using HealthWiseBackend.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data
{
  public class DataSeeder
  {
    public static async Task Seed(HealthWiseDbContext healthWiseDbContext)
    {
      var person = new Person("lhar", "gil");


      healthWiseDbContext.People.Add(person);

      person.AddBloodPressureReading(new BloodPressureReading(119, 82, 80));
      person.AddBloodPressureReading(new BloodPressureReading(113, 78, 75));
      person.AddBloodPressureReading(new BloodPressureReading(115, 79, 82));

      await healthWiseDbContext.SaveChangesAsync();
    }
  }
}
