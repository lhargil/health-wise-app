using HealthWiseBackend.API.Middlewares;
using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Extensions
{
  public static class MiddlewareExtensions
  {
    public static IApplicationBuilder UseRequestContextDataMiddleware(
        this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<RequestContextDataMiddleware>();
    }
  }
}
