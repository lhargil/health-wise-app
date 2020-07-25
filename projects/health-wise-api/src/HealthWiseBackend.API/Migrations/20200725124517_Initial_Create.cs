using System;
using Microsoft.EntityFrameworkCore.Migrations;
using MySql.Data.EntityFrameworkCore.Metadata;

namespace HealthWiseBackend.API.Migrations
{
    public partial class Initial_Create : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    Id = table.Column<byte[]>(nullable: false),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    Version = table.Column<byte[]>(rowVersion: true, nullable: true)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.ComputedColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BloodPressureReadings",
                columns: table => new
                {
                    Id = table.Column<byte[]>(nullable: false),
                    Systole = table.Column<int>(nullable: false),
                    Diastole = table.Column<int>(nullable: false),
                    HeartRate = table.Column<int>(nullable: false),
                    PersonId = table.Column<byte[]>(nullable: false),
                    DateUpdated = table.Column<DateTime>(nullable: false),
                    Status = table.Column<string>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    Version = table.Column<byte[]>(rowVersion: true, nullable: true)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.ComputedColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BloodPressureReadings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BloodPressureReadings_People_PersonId",
                        column: x => x.PersonId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BloodPressureReadings_PersonId",
                table: "BloodPressureReadings",
                column: "PersonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BloodPressureReadings");

            migrationBuilder.DropTable(
                name: "People");
        }
    }
}
