using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Models
{
  public class RequestContextData : IContextData
  {
    public Person CurrentUser { get; set; }
  }
}
