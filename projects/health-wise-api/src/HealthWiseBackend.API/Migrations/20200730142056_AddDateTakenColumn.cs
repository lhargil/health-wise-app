using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthWiseBackend.API.Migrations
{
    public partial class AddDateTakenColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateTaken",
                table: "BloodPressureReadings",
                nullable: false,
                defaultValueSql: "now()");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTaken",
                table: "BloodPressureReadings");
        }
    }
}
