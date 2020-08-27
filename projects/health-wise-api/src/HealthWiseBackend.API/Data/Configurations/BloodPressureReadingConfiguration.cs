using HealthWiseBackend.API.Entities;
using Microsoft.EntityFrameworkCore;
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
        .Property(p => p.DateTaken)
        .HasDefaultValueSql("now()");

      base.Configure(builder);
    }
  }
}
