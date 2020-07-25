using HealthWiseBackend.API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data.Configurations
{
  public class BloodPressureReadingConfiguration: BaseEntityTypeConfiguration<BloodPressureReading>
  {
    public override void Configure(EntityTypeBuilder<BloodPressureReading> builder)
    {
      builder.HasKey(k => k.Id);

      builder
        .HasOne(p => p.Person)
        .WithMany(p => p.BloodPressureReadings)
        .HasForeignKey(p => p.PersonId);

      base.Configure(builder);
    }
  }
}
