using HealthWiseBackend.API.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Core.Concrete
{
  public class DefaultDateTimeManager: IDateTimeManager
  {
    public DefaultDateTimeManager()
    {
      Today = DateTime.UtcNow;
    }

    public DateTime Today { get; private set; }
  }
}
