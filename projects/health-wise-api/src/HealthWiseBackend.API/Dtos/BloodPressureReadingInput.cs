using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Dtos
{
  public class BloodPressureReadingInput
  {
    public int Systole { get; set; }
    public int Diastole { get; set; }
    public int HeartRate { get; set; }
    public DateTime DateTaken { get; set; }
  }
}
