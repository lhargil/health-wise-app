using System;
using HealthWiseBackend.API.Entities;

namespace HealthWiseBackend.API.Dtos
{
  public class BloodPressureReadingDto
  {
    public Guid Id { get; set; }
    public int Systole { get; set; }
    public int Diastole { get; set; }
    public int HeartRate { get; set; }
    public DateTime DateTaken { get; set; }

    public static BloodPressureReadingDto Create(BloodPressureReading bloodPressureReading)
    {
      return new BloodPressureReadingDto
      {
        Id = bloodPressureReading.Id,
        Systole = bloodPressureReading.Systole,
        Diastole = bloodPressureReading.Diastole,
        HeartRate = bloodPressureReading.HeartRate,
        DateTaken = new DateTimeOffset(bloodPressureReading.DateTaken).UtcDateTime
      };
    }
  }
}
