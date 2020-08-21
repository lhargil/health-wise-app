using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;
using HealthWiseBackend.API.Core.Concrete;
using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Extensions;
using HealthWiseBackend.API.Models;
using HealthWiseBackend.API.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace HealthWiseBackend.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
          services.Configure<AppOptions>(Configuration.GetSection(
                                    AppOptions.OptionsString));

          services.AddDbContext<HealthWiseDbContext>(options => options.UseMySQL(Configuration.GetConnectionString("HealthWiseDb")));

          services.AddCors(options =>
          {
            options.AddPolicy("AllowAll", builder =>
            {
              builder
                  .AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .WithExposedHeaders(new[] { "Location" });
            });
          });

          services.AddAuthentication(options =>
          {
              options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          }).AddJwtBearer(options =>
          {
              options.Authority = Configuration.GetValue<string>("HEALTHWISE_AUTHCONFIG_STSAUTHORITY");
              options.Audience = Configuration.GetValue<string>("HEALTHWISE_AUTHCONFIG_APIID");
              options.RequireHttpsMetadata = false;
              options.TokenValidationParameters = new TokenValidationParameters
              {
                NameClaimType = ClaimTypes.NameIdentifier
              };
          });

          services.AddControllers(options => {

            // requires using Microsoft.AspNetCore.Mvc.Formatters;
            options.OutputFormatters.RemoveType<StringOutputFormatter>();
            options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();

            var policy = new AuthorizationPolicyBuilder()
              .RequireAuthenticatedUser()
              .Build();
            options.Filters.Add(new AuthorizeFilter(policy));
          })
          .AddJsonOptions(options =>
          {
            // Use the default property (Pascal) casing.
            options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
          });

          // Register the Swagger services
          services.AddSwaggerDocument(config =>
          {
            config.PostProcess = document =>
            {
              document.Info.Version = "v1";
              document.Info.Title = "Health wise API";
              document.Info.Description = "An API for the easy-to-use health app";
              document.Info.TermsOfService = "None";
              document.Info.Contact = new NSwag.OpenApiContact
              {
                Name = "Lhar",
                Email = "me@lhagil.com",
                Url = "https://twitter.com/lhargil"
              };
              document.Info.License = new NSwag.OpenApiLicense
              {
                Name = "Use under LICX",
                Url = "https://example.com/license"
              };
            };
          });

          services.AddTransient<IDateTimeManager, DefaultDateTimeManager>();

          services.AddScoped<IContextData, RequestContextData>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
              ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseRequestContextDataMiddleware();

            app.UseCors("AllowAll");

            // Register the Swagger generator and the Swagger UI middlewares
            app.UseOpenApi();
            app.UseSwaggerUi3();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
