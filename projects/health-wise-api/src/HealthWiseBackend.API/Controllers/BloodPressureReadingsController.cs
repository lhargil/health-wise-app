using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthWiseBackend.API.Controllers
{
  [Route("api/people/{personId}/[controller]")]
  [ApiController]
  public class BloodPressureReadingsController : ControllerBase
  {
    private readonly HealthWiseDbContext _healthWiseDbContext;

    public BloodPressureReadingsController(HealthWiseDbContext healthWiseDbContext)
    {
      _healthWiseDbContext = healthWiseDbContext;
    }
    // GET: api/<BloodPressureReadingsController>
    [HttpGet]
    public async Task<ActionResult> Get(Guid personId)
    {
      var bloodPressureReadings = await _healthWiseDbContext.BloodPressureReadings
        .Where(reading => reading.PersonId == personId)
        .Select(reading => new BloodPressureReadingDto
        {
          Id = reading.Id,
          Systole = reading.Systole,
          Diastole = reading.Diastole,
          HeartRate = reading.HeartRate
        })
        .ToListAsync();

      return Ok(bloodPressureReadings);
    }

    // GET api/<BloodPressureReadingsController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BloodPressureReadingDto>> Get(Guid personId, Guid id)
    {
      var bloodPressureReading = await _healthWiseDbContext.BloodPressureReadings
        .FirstOrDefaultAsync(reading => reading.PersonId == personId && reading.Id == id);

      if (bloodPressureReading == null)
      {
        return NotFound("The blood pressure reading does not exist");
      }

      var bloodPressureReadingDto = new BloodPressureReadingDto {
        Id = bloodPressureReading.Id,
        Systole = bloodPressureReading.Systole,
        Diastole = bloodPressureReading.Diastole,
        HeartRate = bloodPressureReading.HeartRate
      };

      return Ok(bloodPressureReadingDto);
    }

    // POST api/<BloodPressureReadingsController>
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/<BloodPressureReadingsController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<BloodPressureReadingsController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
