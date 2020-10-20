using HealthWiseBackend.API.Enums;
using System;

namespace HealthWiseBackend.API.Entities
{
  public class BloodPressureReading
  {
    private BloodPressureReading()
    {

    }

    public BloodPressureReading(int systole, int diastole, int heartRate)
    {
      Systole = systole;
      Diastole = diastole;
      HeartRate = heartRate;
    }

    public BloodPressureReading(Guid id, int systole, int diastole, int heartRate): this(systole, diastole, heartRate)
    {
      Id = id;
    }

    public Guid Id { get; private set; }
    public int Systole { get; private set; }
    public int Diastole { get; private set; }
    public int HeartRate { get; private set; }
    public DateTime DateTaken { get; set; }

    public string PersonId { get; set; }
  }
}
