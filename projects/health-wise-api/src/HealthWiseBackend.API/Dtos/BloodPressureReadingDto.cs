using System;

namespace HealthWiseBackend.API.Dtos
{
  public class BloodPressureReadingDto
  {
    public Guid Id { get; set; }
    public int Systole { get; set; }
    public int Diastole { get; set; }
    public int HeartRate { get; set; }
  }
}
