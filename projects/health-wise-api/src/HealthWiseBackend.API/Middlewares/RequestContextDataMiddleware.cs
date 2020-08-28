using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Entities;
using HealthWiseBackend.API.Options;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Middlewares
{
  public class RequestContextDataMiddleware
  {
    private readonly RequestDelegate _next;

    public RequestContextDataMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task Invoke(HttpContext httpContext, IContextData svc)
    {
      var userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (String.IsNullOrEmpty(userId))
      {
        await _next(httpContext);
        return;
      }

      svc.CurrentUser = new Person(userId);

      await _next(httpContext);

    }
  }
}
