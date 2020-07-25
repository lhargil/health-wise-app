using HealthWiseBackend.API.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthWiseBackend.API.Data.Configurations
{
  public abstract class BaseEntityTypeConfiguration<T> : IEntityTypeConfiguration<T>
        where T : class
  {
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
      builder.Property<DateTime>("DateUpdated");
      builder.Property<string>("UpdatedBy");

      builder.Property<Statuses>("Status")
          .HasConversion(new EnumToStringConverter<Statuses>());

      builder.Property<byte[]>("Version")
          .ValueGeneratedOnAddOrUpdate()
          .IsRowVersion();

      builder.HasQueryFilter(item => EF.Property<Statuses>(item, "Status") != Statuses.Archived);
    }
  }
}
