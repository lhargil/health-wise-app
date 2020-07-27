using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Entities;
using Microsoft.AspNetCore.Http;
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

    public async Task Invoke(HttpContext httpContext, IContextData svc, HealthWiseDbContext healthWiseDbContext)
    {
      var email = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
      svc.CurrentUser = new Person("lhar", "gil");
      await _next(httpContext);
    }
  }
}
