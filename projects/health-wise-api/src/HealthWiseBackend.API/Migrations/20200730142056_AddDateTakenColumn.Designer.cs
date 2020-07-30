﻿// <auto-generated />
using System;
using HealthWiseBackend.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HealthWiseBackend.API.Migrations
{
    [DbContext(typeof(HealthWiseDbContext))]
    [Migration("20200730142056_AddDateTakenColumn")]
    partial class AddDateTakenColumn
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("HealthWiseBackend.API.Entities.BloodPressureReading", b =>
                {
                    b.Property<byte[]>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varbinary(16)");

                    b.Property<DateTime>("DateTaken")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("now()");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("datetime");

                    b.Property<int>("Diastole")
                        .HasColumnType("int");

                    b.Property<int>("HeartRate")
                        .HasColumnType("int");

                    b.Property<byte[]>("PersonId")
                        .IsRequired()
                        .HasColumnType("varbinary(16)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Systole")
                        .HasColumnType("int");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.ToTable("BloodPressureReadings");
                });

            modelBuilder.Entity("HealthWiseBackend.API.Entities.Person", b =>
                {
                    b.Property<byte[]>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varbinary(16)");

                    b.Property<DateTime>("DateUpdated")
                        .HasColumnType("datetime");

                    b.Property<string>("Firstname")
                        .HasColumnType("text");

                    b.Property<string>("Lastname")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("People");
                });

            modelBuilder.Entity("HealthWiseBackend.API.Entities.BloodPressureReading", b =>
                {
                    b.HasOne("HealthWiseBackend.API.Entities.Person", "Person")
                        .WithMany("BloodPressureReadings")
                        .HasForeignKey("PersonId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
