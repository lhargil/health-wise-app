using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Entities;
using HealthWiseBackend.API.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
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

    public async Task Invoke(HttpContext httpContext, IContextData svc, HealthWiseDbContext healthWiseDbContext, IOptions<AppOptions> options)
    {
      var email = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

      var currentUser = await healthWiseDbContext.People.FindAsync(Guid.Parse(options.Value.TestUser));
      if (currentUser == null)
      {
        throw new NullReferenceException("The user does not exist.");
      }
      svc.CurrentUser = currentUser;
      await _next(httpContext);
    }
  }
}
