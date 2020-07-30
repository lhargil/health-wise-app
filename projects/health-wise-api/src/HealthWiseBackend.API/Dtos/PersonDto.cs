using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Dtos
{
  public class PersonDto
  {
    public Guid Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Fullname { get => $"{Firstname} {Lastname}"; }
  }
}
