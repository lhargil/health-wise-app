using HealthWiseBackend.API.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Entities
{
  public class Person
  {
    private Person()
    {
      BloodPressureReadings = new List<BloodPressureReading>();
    }
    public Person(string id): this()
    {
      Id = id;
    }
    public string Id { get; private set; }
    public string Firstname { get; private set; }
    public string Lastname { get; private set; }
    public string Fullname { get => $"{Firstname} {Lastname}"; }

    public ICollection<BloodPressureReading> BloodPressureReadings { get; private set; }

    public void AddBloodPressureReading(BloodPressureReading bloodPressureReading)
    {
      BloodPressureReadings.Add(bloodPressureReading);
    }

    public void RemoveBloodPressureReading(BloodPressureReading bloodPressureReading)
    {
      BloodPressureReadings.Remove(bloodPressureReading);
    }
  }
}
