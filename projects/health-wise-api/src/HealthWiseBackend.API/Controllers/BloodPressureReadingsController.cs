using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Dtos;
using HealthWiseBackend.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

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
        .OrderBy(o => o.DateTaken)
        .Select(reading => BloodPressureReadingDto.Create(reading))
        .ToListAsync();

      return Ok(bloodPressureReadings);
    }

    // GET api/<BloodPressureReadingsController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BloodPressureReadingDto>> Get(Guid personId, Guid id)
    {
      var bloodPressureReading = await _healthWiseDbContext.BloodPressureReadings
        .Where(reading => reading.PersonId == personId && reading.Id == id)
        .FirstOrDefaultAsync();

      if (bloodPressureReading == null)
      {
        return NotFound("The blood pressure reading does not exist");
      }

      var bloodPressureReadingDto = BloodPressureReadingDto.Create(bloodPressureReading);

      return Ok(bloodPressureReadingDto);
    }

    // POST api/<BloodPressureReadingsController>
    [HttpPost]
    public async Task<ActionResult> Post(Guid personId, [FromBody] BloodPressureReadingInput bloodPressureReadingInput)
    {
      var bloodPressureReadingToCreate = new BloodPressureReading(bloodPressureReadingInput.Systole, bloodPressureReadingInput.Diastole, bloodPressureReadingInput.HeartRate);
      bloodPressureReadingToCreate.DateTaken = bloodPressureReadingInput.DateTaken;

      var person = await _healthWiseDbContext.People.FindAsync(personId);

      if (person == null)
      {
        return NotFound("The person does not exist");
      }

      person.AddBloodPressureReading(bloodPressureReadingToCreate);

      await _healthWiseDbContext.SaveChangesAsync();

      return CreatedAtAction(nameof(this.Get), new { personId, id = bloodPressureReadingToCreate.Id }, BloodPressureReadingDto.Create(bloodPressureReadingToCreate));
    }

    // DELETE api/<BloodPressureReadingsController>/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid personId, Guid id)
    {
      var person = await _healthWiseDbContext.People.FindAsync(personId);

      if (person == null)
      {
        return NotFound("The person does not exist");
      }

      var bloodPressureReadingToRemove = await _healthWiseDbContext.BloodPressureReadings.FindAsync(id);

      if (bloodPressureReadingToRemove == null)
      {
        return NotFound("The blood pressure reading to remove does not exist");
      }

      person.RemoveBloodPressureReading(bloodPressureReadingToRemove);

      await _healthWiseDbContext.SaveChangesAsync();

      return NoContent();
    }
  }
}
