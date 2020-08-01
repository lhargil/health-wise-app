using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Core.Interfaces
{
  public interface IDateTimeManager
  {
    public DateTime Today { get; }
  }
}
