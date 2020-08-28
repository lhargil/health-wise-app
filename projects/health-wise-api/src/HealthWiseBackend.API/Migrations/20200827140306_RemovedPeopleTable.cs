using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthWiseBackend.API.Migrations
{
    public partial class RemovedPeopleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BloodPressureReadings_People_PersonId",
                table: "BloodPressureReadings");

            migrationBuilder.DropTable(
                name: "People");

            migrationBuilder.DropIndex(
                name: "IX_BloodPressureReadings_PersonId",
                table: "BloodPressureReadings");

            migrationBuilder.AlterColumn<string>(
                name: "PersonId",
                table: "BloodPressureReadings",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(16)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "PersonId",
                table: "BloodPressureReadings",
                type: "varbinary(16)",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    Id = table.Column<byte[]>(type: "varbinary(16)", nullable: false),
                    DateUpdated = table.Column<DateTime>(type: "datetime", nullable: false),
                    Firstname = table.Column<string>(type: "text", nullable: true),
                    Lastname = table.Column<string>(type: "text", nullable: true),
                    Status = table.Column<string>(type: "text", nullable: false),
                    UpdatedBy = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BloodPressureReadings_PersonId",
                table: "BloodPressureReadings",
                column: "PersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_BloodPressureReadings_People_PersonId",
                table: "BloodPressureReadings",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
