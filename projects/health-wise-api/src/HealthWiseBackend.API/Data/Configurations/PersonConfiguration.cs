using HealthWiseBackend.API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data.Configurations
{
  public class PersonConfiguration: BaseEntityTypeConfiguration<Person>
  {
    public override void Configure(EntityTypeBuilder<Person> builder)
    {
      builder
        .HasKey(p => p.Id);

      builder
          .HasMany(p => p.BloodPressureReadings)
          .WithOne(p => p.Person)
          .IsRequired();

      base.Configure(builder);
    }
  }
}
