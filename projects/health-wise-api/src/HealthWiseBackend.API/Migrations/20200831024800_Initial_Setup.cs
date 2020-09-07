using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthWiseBackend.API.Migrations
{
    public partial class Initial_Setup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BloodPressureReadings",
                columns: table => new
                {
                    Id = table.Column<byte[]>(nullable: false),
                    Systole = table.Column<int>(nullable: false),
                    Diastole = table.Column<int>(nullable: false),
                    HeartRate = table.Column<int>(nullable: false),
                    DateTaken = table.Column<DateTime>(nullable: false, defaultValueSql: "now()"),
                    PersonId = table.Column<string>(nullable: true),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodPressureReadings", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BloodPressureReadings");
        }
    }
}
