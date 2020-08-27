using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthWiseBackend.API.Core.Interfaces;
using HealthWiseBackend.API.Data;
using HealthWiseBackend.API.Dtos;
using HealthWiseBackend.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HealthWiseBackend.API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize(Roles = "StandardUser")]
  public class BloodPressureReadingsController : ControllerBase
  {
    private readonly HealthWiseDbContext _healthWiseDbContext;
    private readonly IContextData _contextData;

    public BloodPressureReadingsController(HealthWiseDbContext healthWiseDbContext, IContextData contextData)
    {
      _healthWiseDbContext = healthWiseDbContext;
      _contextData = contextData;
    }
    // GET: api/<BloodPressureReadingsController>
    [HttpGet]
    public async Task<ActionResult> Get()
    {
      var bloodPressureReadings = await _healthWiseDbContext.BloodPressureReadings
        .Where(reading => reading.PersonId == _contextData.CurrentUser.Id)
        .OrderBy(o => o.DateTaken)
        .Select(reading => BloodPressureReadingDto.Create(reading))
        .ToListAsync();

      return Ok(bloodPressureReadings);
    }

    // GET api/<BloodPressureReadingsController>/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BloodPressureReadingDto>> Get(Guid id)
    {
      var bloodPressureReading = await _healthWiseDbContext.BloodPressureReadings
        .Where(reading => reading.PersonId == _contextData.CurrentUser.Id && reading.Id == id)
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
    public async Task<ActionResult> Post([FromBody] BloodPressureReadingInput bloodPressureReadingInput)
    {
      var bloodPressureReadingToCreate = new BloodPressureReading(bloodPressureReadingInput.Systole, bloodPressureReadingInput.Diastole, bloodPressureReadingInput.HeartRate);
      bloodPressureReadingToCreate.DateTaken = bloodPressureReadingInput.DateTaken;
      bloodPressureReadingToCreate.PersonId = _contextData.CurrentUser.Id;

      await _healthWiseDbContext.BloodPressureReadings.AddAsync(bloodPressureReadingToCreate);
      await _healthWiseDbContext.SaveChangesAsync();

      return CreatedAtAction(nameof(this.Get), new { id = bloodPressureReadingToCreate.Id }, BloodPressureReadingDto.Create(bloodPressureReadingToCreate));
    }

    // DELETE api/<BloodPressureReadingsController>/5
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
      var bloodPressureReadingToRemove = await _healthWiseDbContext.BloodPressureReadings.FindAsync(id);

      if (bloodPressureReadingToRemove == null)
      {
        return NotFound("The blood pressure reading to remove does not exist");
      }

     _healthWiseDbContext.Remove(bloodPressureReadingToRemove);

      await _healthWiseDbContext.SaveChangesAsync();

      return NoContent();
    }
  }
}
